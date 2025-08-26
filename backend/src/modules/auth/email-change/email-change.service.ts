import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common"
import { verify } from "argon2"
import { Request } from "express"

import { MailerService } from "@/modules/mailer/mailer.service"
import { PrismaService } from "@/modules/prisma/prisma.service"
import { getSessionMetadata } from "@/modules/session/utils/session.utils"
import { TokenService } from "@/modules/token/token.service"
import { UserService } from "@/modules/user/user.service"

import { ChangeEmailInput } from "./inputs/change-email.input"

@Injectable()
export class EmailChangeService {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService,
    private readonly mailerService: MailerService
  ) {}

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
      firstName: user.firstName,
      lastName: user.lastName,
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
}
