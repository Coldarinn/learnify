import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { hash, verify } from "argon2"
import { Request } from "express"

import { MailerService } from "@/modules/mailer/mailer.service"
import { PrismaService } from "@/modules/prisma/prisma.service"
import { SessionModel } from "@/modules/session/models/session.model"
import { SessionService } from "@/modules/session/session.service"
import { TokenService } from "@/modules/token/token.service"
import { UserModel } from "@/modules/user/models/user.model"
import { UserService } from "@/modules/user/user.service"

import { TwoFaService } from "../2fa/2fa.service"
import { getSessionMetadata } from "../session/utils/session.utils"

import { ChangeEmailInput } from "./inputs/change-email.input"
import { ChangePasswordInput } from "./inputs/change-password.input"
import { SignInInput } from "./inputs/sign-in.input"
import { SignUpInput } from "./inputs/sign-up.input"

@Injectable()
export class AuthService {
  private readonly PASSWORD_RESET_THROTTLE = 60_000

  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService,
    private readonly mailerService: MailerService,
    private readonly sessionService: SessionService,
    private readonly twoFaService: TwoFaService
  ) {}

  async signUp(input: SignUpInput): Promise<boolean> {
    const { username, email, password, ...otherInput } = input

    const [usernameExists, emailExists] = await Promise.all([
      this.prismaService.user.findUnique({ where: { username } }),
      this.prismaService.user.findUnique({ where: { email } }),
    ])

    if (usernameExists) throw new ConflictException("Username already in use")
    if (emailExists) throw new ConflictException("Email already in use")

    const { user, token } = await this.prismaService.$transaction(async (tx) => {
      const hashedPassword = await hash(password)

      const user = await this.userService.create({ username, email, password: hashedPassword, ...otherInput }, tx)

      const token = await this.tokenService.createForUser({ userId: user.id, type: "EMAIL_CONFIRM" }, tx)

      return { user, token }
    })

    await this.mailerService.sendConfirmEmail({
      to: user.email,
      username: user.username,
      token,
    })

    return true
  }

  async confirmEmail(token: string): Promise<boolean> {
    const { userId } = await this.tokenService.validateToken(token, "EMAIL_CONFIRM")

    await this.prismaService.$transaction(async (tx) => {
      await this.userService.update(userId, { isEmailConfirmed: true }, tx)
      await tx.token.delete({ where: { token } })
    })

    return true
  }

  async signIn(
    input: SignInInput,
    session: Request["session"],
    headers: Request["headers"],
    ip: Request["ip"],
    userAgent: string
  ): Promise<UserModel> {
    const { login, password, twoFaCode } = input

    const user = await this.userService.findByLogin(login)
    if (!user.isEmailConfirmed) throw new UnauthorizedException("Please confirm your email")

    const isValidPassword = await verify(user.password, password)
    if (!isValidPassword) throw new UnauthorizedException("Invalid password")

    if (user.isTwoFaEnabled) {
      if (!twoFaCode) throw new UnauthorizedException("TWO_FA_REQUIRED")

      await this.twoFaService.verifyCode(user.id, twoFaCode)
    }

    const metadata = getSessionMetadata(headers, ip, userAgent)

    await this.sessionService.save(session, user.id, metadata)

    const { password: _, ...safeUser } = user
    return safeUser
  }

  signOut(req: Request): Promise<boolean> {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) reject(new InternalServerErrorException("Session error"))
        req.res?.clearCookie(this.configService.get("SESSION_NAME")!)
        resolve(true)
      })
    })
  }

  async requestPasswordReset(headers: Request["headers"], ip: Request["ip"], userAgent: string, email: string): Promise<boolean> {
    const user = await this.userService.findByLogin(email)

    const recentReset = await this.prismaService.token.findFirst({
      where: {
        userId: user.id,
        type: "PASSWORD_RESET",
        createdAt: {
          gte: new Date(Date.now() - this.PASSWORD_RESET_THROTTLE),
        },
      },
    })

    if (recentReset) throw new ConflictException("Too many password reset requests")

    const token = await this.tokenService.createForUser({ userId: user.id, type: "PASSWORD_RESET" })

    const metadata = getSessionMetadata(headers, ip, userAgent)

    await this.mailerService.sendPasswordResetEmail({
      to: user.email,
      username: user.username,
      token,
      metadata,
    })

    return true
  }

  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    const { userId } = await this.tokenService.validateToken(token, "PASSWORD_RESET")

    const hashedPassword = await hash(newPassword)

    await this.prismaService.$transaction(async (tx) => {
      await this.userService.update(userId, { password: hashedPassword }, tx)
      await tx.token.delete({ where: { token } })
    })

    return true
  }

  async changePassword(userId: string, input: ChangePasswordInput): Promise<boolean> {
    const { currentPassword, newPassword } = input

    const user = await this.userService.getById(userId)
    const isMatch = await verify(user.password, currentPassword)

    if (!isMatch) throw new UnauthorizedException("Current password is incorrect")

    const hashedNewPassword = await hash(newPassword)

    await this.userService.update(userId, { password: hashedNewPassword })

    return true
  }

  async requestEmailChange(
    headers: Request["headers"],
    ip: Request["ip"],
    userAgent: string,
    userId: string,
    input: ChangeEmailInput
  ): Promise<boolean> {
    const { currentPassword, newEmail } = input

    const user = await this.userService.getById(userId)

    const isMatch = await verify(user.password, currentPassword)
    if (!isMatch) throw new UnauthorizedException("Incorrect password")

    const existing = await this.prismaService.user.findUnique({ where: { email: newEmail } })
    if (existing) throw new ConflictException("Email is already in use")

    const token = await this.tokenService.createForUser({
      userId,
      type: "EMAIL_CHANGE",
    })

    const metadata = getSessionMetadata(headers, ip, userAgent)

    await this.mailerService.sendEmailChange({
      to: newEmail,
      username: user.username,
      token,
      metadata,
    })

    return true
  }

  async confirmEmailChange(token: string, newEmail: string): Promise<boolean> {
    const { userId } = await this.tokenService.validateToken(token, "EMAIL_CHANGE")

    await this.prismaService.$transaction(async (tx) => {
      await this.userService.update(userId, { email: newEmail }, tx)
      await tx.token.delete({ where: { token } })
    })

    return true
  }

  getCurrentSession(sessionId: string): Promise<SessionModel> {
    return this.sessionService.getById(sessionId)
  }

  getUserSessions(userId?: string): Promise<SessionModel[]> {
    if (!userId) throw new NotFoundException("Session not found")
    return this.sessionService.getAllByUser(userId)
  }

  async terminateSession(session: Request["session"], sessionId: string): Promise<boolean> {
    if (session.id === sessionId) throw new ConflictException("The current session cannot be deleted")

    const exists = await this.sessionService.exists(sessionId)
    if (!exists) throw new NotFoundException("Session not found")

    return this.sessionService.terminateById(sessionId)
  }
}
