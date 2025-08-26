import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common"
import { hash, verify } from "argon2"
import { Request } from "express"

import { MailerService } from "@/modules/mailer/mailer.service"
import { PrismaService } from "@/modules/prisma/prisma.service"
import { getSessionMetadata } from "@/modules/session/utils/session.utils"
import { TokenService } from "@/modules/token/token.service"
import { UserService } from "@/modules/user/user.service"

import { ChangePasswordInput } from "./inputs/change-password.input"

@Injectable()
export class PasswordRecoveryService {
  private readonly PASSWORD_RESET_THROTTLE = 60_000

  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService,
    private readonly mailerService: MailerService
  ) {}

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
      firstName: user.firstName,
      lastName: user.lastName,
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

    if ((!user.password && user.oAuthAccounts.length === 0) || user.password) {
      const isMatch = await verify(user.password, currentPassword)
      if (!isMatch) throw new UnauthorizedException("Current password is incorrect")
    }

    const hashedNewPassword = await hash(newPassword)

    await this.userService.update(userId, { password: hashedNewPassword })

    return true
  }
}
