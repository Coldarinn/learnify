import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { verify } from "argon2"
import { Request } from "express"

import { UserService } from "@/modules/user/user.service"

import { RedisService } from "../redis/redis.service"
import { UserModel } from "../user/models/user.model"

import { SignInInput } from "./inputs/sign-in.input"
import { SignUpInput } from "./inputs/sign-up.input"
import { SessionModel } from "./models/session.model"
import { getSessionMetadata } from "./utils/session.utils"

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService
  ) {}

  async signUp(input: SignUpInput): Promise<boolean> {
    return this.userService.create(input)
  }

  async signIn(req: Request, input: SignInInput, userAgent: string): Promise<UserModel> {
    const { login, password } = input

    const user = await this.userService.findByLogin(login)

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

  async signOut(req: Request): Promise<boolean> {
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

    const sessionRaw = await this.redisService.get(`${this.configService.get("SESSION_FOLDER")}${sessionId}`)
    if (!sessionRaw) throw new NotFoundException("Session not found")

    return {
      ...(JSON.parse(sessionRaw) as SessionModel),
      id: sessionId,
    }
  }

  async userSessions(req: Request): Promise<SessionModel[]> {
    const userId = req.session.userId
    if (!userId) throw new NotFoundException("Session not found")

    const keys = await this.redisService.scan(`${this.configService.get("SESSION_FOLDER")}*`)

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

    const key = `${this.configService.get("SESSION_FOLDER")}${sessionId}`

    const exists = await this.redisService.get(key)
    if (!exists) throw new NotFoundException("Session not found")

    await this.redisService.del(key)

    return true
  }
}
