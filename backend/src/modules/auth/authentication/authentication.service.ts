import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { verify } from "argon2"
import { Request } from "express"

import { TwoFaService } from "@/modules/2fa/2fa.service"
import { SessionService } from "@/modules/session/session.service"
import { getSessionMetadata } from "@/modules/session/utils/session.utils"
import { UserModel } from "@/modules/user/models/user.model"
import { UserService } from "@/modules/user/user.service"

import { SignInInput } from "./inputs/sign-in.input"

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly sessionService: SessionService,
    private readonly twoFaService: TwoFaService
  ) {}

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

    if (!user.password) throw new UnauthorizedException("You don't have a password yet. You need to sign in via Google or Yandex")

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
}
