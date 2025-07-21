import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { verify } from "argon2"
import { Request } from "express"

import { UserService } from "./../user/user.service"
import { SignInInput } from "./inputs/sign-in.input"
import { SignUpInput } from "./inputs/sign-up.input"

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {}

  async signUp(input: SignUpInput) {
    return this.userService.create(input)
  }

  async signIn(req: Request, input: SignInInput) {
    const { login, password } = input

    const user = await this.userService.findByLogin(login)

    const isValidPassword = await verify(user.password, password)

    if (!isValidPassword) throw new UnauthorizedException("Invalid password")

    return new Promise((resolve, reject) => {
      req.session.createdAt = new Date()
      req.session.userId = user.id

      req.session.save((err) => {
        console.log("err: ", err)
        if (err) reject(new InternalServerErrorException("Session error"))

        resolve(user)
      })
    })
  }

  async signOut(req: Request) {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) reject(new InternalServerErrorException("Session error"))

        req.res?.clearCookie(this.configService.get("SESSION_NAME")!)

        resolve(true)
      })
    })
  }
}
