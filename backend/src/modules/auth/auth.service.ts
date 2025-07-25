import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common"
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

import { getSessionMetadata } from "../session/utils/session.utils"

import { SignInInput } from "./inputs/sign-in.input"
import { SignUpInput } from "./inputs/sign-up.input"

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService,
    private readonly mailerService: MailerService,
    private readonly sessionService: SessionService
  ) {}

  async signUp(input: SignUpInput): Promise<boolean> {
    const { username, email, password } = input

    const [usernameExists, emailExists] = await Promise.all([
      this.prismaService.user.findUnique({ where: { username } }),
      this.prismaService.user.findUnique({ where: { email } }),
    ])

    if (usernameExists) throw new ConflictException("Username already in use")
    if (emailExists) throw new ConflictException("Email already in use")

    const { user, token } = await this.prismaService.$transaction(async (tx) => {
      const hashedPassword = await hash(password)
      const user = await tx.user.create({
        data: { username, email, password: hashedPassword },
      })

      const token = await this.tokenService.generateToken({ userId: user.id, type: "EMAIL_CONFIRM" }, tx)

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
    const tokenRecord = await this.prismaService.token.findUnique({
      where: { token },
      include: { user: true },
    })

    if (!tokenRecord || tokenRecord.expiresIn < new Date() || tokenRecord.type !== "EMAIL_CONFIRM")
      throw new BadRequestException("Invalid or expired token")

    await this.prismaService.user.update({
      where: { id: tokenRecord.userId! },
      data: { isEmailConfirmed: true },
    })

    await this.prismaService.token.delete({ where: { token } })

    return true
  }

  async signIn(
    input: SignInInput,
    session: Request["session"],
    headers: Request["headers"],
    ip: Request["ip"],
    userAgent: string
  ): Promise<UserModel> {
    const { login, password } = input

    const user = await this.userService.findByLogin(login)
    if (!user.isEmailConfirmed) throw new UnauthorizedException("Please confirm your email")

    const isValidPassword = await verify(user.password, password)
    if (!isValidPassword) throw new UnauthorizedException("Invalid password")

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
