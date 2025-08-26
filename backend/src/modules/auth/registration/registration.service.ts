import { ConflictException, Injectable } from "@nestjs/common"
import { hash } from "argon2"

import { MailerService } from "@/modules/mailer/mailer.service"
import { PrismaService } from "@/modules/prisma/prisma.service"
import { TokenService } from "@/modules/token/token.service"
import { UserService } from "@/modules/user/user.service"

import { SignUpInput } from "./inputs/sign-up.input"

@Injectable()
export class RegistrationService {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService,
    private readonly mailerService: MailerService
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
      firstName: user.firstName,
      lastName: user.lastName,
      token,
    })

    return true
  }

  async reSendConfirmEmail(oldToken: string): Promise<boolean> {
    const { user, token } = await this.prismaService.$transaction(async (tx) => {
      const user = await tx.user.findFirst({
        where: { tokens: { some: { token: oldToken } } },
        include: { tokens: true },
      })

      if (!user) throw new Error("Invalid or expired token")

      await tx.token.deleteMany({
        where: { userId: user.id, type: "EMAIL_CONFIRM" },
      })

      const newToken = await this.tokenService.createForUser({ userId: user.id, type: "EMAIL_CONFIRM" }, tx)

      return { user, token: newToken }
    })

    await this.mailerService.sendConfirmEmail({
      to: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
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
}
