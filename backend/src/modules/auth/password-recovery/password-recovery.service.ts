import { ConflictException, Injectable } from "@nestjs/common"
import { hash } from "argon2"
import { Request } from "express"

import { MailerService } from "@/modules/mailer/mailer.service"
import { PrismaService } from "@/modules/prisma/prisma.service"
import { getSessionMetadata } from "@/modules/session/utils/session.utils"
import { TokenService } from "@/modules/token/token.service"
import { UserService } from "@/modules/user/user.service"

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
}
