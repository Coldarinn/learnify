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
import { RedisService } from "@/modules/redis/redis.service"
import { TokenService } from "@/modules/token/token.service"
import { UserModel } from "@/modules/user/models/user.model"
import { UserService } from "@/modules/user/user.service"

import { SignInInput } from "./inputs/sign-in.input"
import { SignUpInput } from "./inputs/sign-up.input"
import { SessionModel } from "./models/session.model"
import { getSessionMetadata } from "./utils/session.utils"

@Injectable()
export class AuthService {
  private sessionPrefix = ""

  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService,
    private readonly mailerService: MailerService
  ) {
    this.sessionPrefix = this.configService.get("SESSION_PREFIX")!
  }

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

      const token = await this.tokenService.generateToken(
        {
          userId: user.id,
          type: "EMAIL_CONFIRM",
        },
        tx
      )

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

  async signIn(req: Request, input: SignInInput, userAgent: string): Promise<UserModel> {
    const { login, password } = input

    const user = await this.userService.findByLogin(login)

    if (!user.isEmailConfirmed) throw new UnauthorizedException("Please confirm your email")

    const isValidPassword = await verify(user.password, password)

    if (!isValidPassword) throw new UnauthorizedException("Invalid password")

    const metadata = getSessionMetadata(req, userAgent)

    return new Promise((resolve, reject) => {
      req.session.createdAt = new Date()
      req.session.userId = user.id
      req.session.metadata = metadata

      req.session.save((err) => {
        if (err) reject(new InternalServerErrorException("Session error"))

        const { password: _, ...safeUser } = user
        resolve(safeUser)
      })
    })
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

  async getCurrentSession(req: Request): Promise<SessionModel> {
    const sessionId = req.session.id

    const sessionRaw = await this.redisService.get(`${this.sessionPrefix}${sessionId}`)
    if (!sessionRaw) throw new NotFoundException("Session not found")

    return {
      ...(JSON.parse(sessionRaw) as SessionModel),
      id: sessionId,
    }
  }

  async userSessions(req: Request): Promise<SessionModel[]> {
    const userId = req.session.userId
    if (!userId) throw new NotFoundException("Session not found")

    const keys = await this.redisService.scan(`${this.sessionPrefix}*`)

    const sessions = await Promise.all(
      keys.map(async (key) => {
        const sessionRaw = await this.redisService.get(key)
        if (!sessionRaw) return null

        const sessionData = JSON.parse(sessionRaw) as SessionModel
        const session = { ...sessionData, id: key.split(":")[1] }

        return session.userId === userId ? session : null
      })
    )

    return sessions.filter((s) => !!s).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  async deleteSession(req: Request, sessionId: string): Promise<boolean> {
    if (req.session.id === sessionId) throw new ConflictException("The current session cannot be deleted")

    const key = `${this.sessionPrefix}${sessionId}`

    const exists = await this.redisService.get(key)
    if (!exists) throw new NotFoundException("Session not found")

    await this.redisService.del(key)

    return true
  }
}
