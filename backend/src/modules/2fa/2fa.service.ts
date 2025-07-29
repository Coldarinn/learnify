import { Injectable, UnauthorizedException } from "@nestjs/common"
import qrcode from "qrcode"
import speakeasy, { GeneratedSecretWithOtpAuthUrl } from "speakeasy"

import { UserService } from "@/modules/user/user.service"

@Injectable()
export class TwoFaService {
  constructor(private readonly userService: UserService) {}

  async generateSecret(userId: string) {
    const user = await this.userService.getById(userId)

    const secret = speakeasy.generateSecret({
      name: `Tessera (${user.email})`,
    }) as GeneratedSecretWithOtpAuthUrl

    await this.userService.update(userId, {
      tempTwoFaSecret: secret.base32,
    })

    const qrCodeDataURL = qrcode.toDataURL(secret.otpauth_url)

    return { qrCodeDataURL }
  }

  async enable(userId: string, code: string): Promise<boolean> {
    const user = await this.userService.getById(userId)
    if (!user.tempTwoFaSecret) throw new UnauthorizedException("No pending 2FA secret")

    const isValid = speakeasy.totp.verify({
      secret: user.tempTwoFaSecret,
      encoding: "base32",
      token: code,
      window: 1,
    })
    if (!isValid) throw new UnauthorizedException("Invalid 2FA code")

    await this.userService.update(userId, { isTwoFaEnabled: true, twoFaSecret: user.tempTwoFaSecret, tempTwoFaSecret: null })

    return true
  }

  async disable(userId: string, code: string): Promise<boolean> {
    const user = await this.userService.getById(userId)

    const isValid = speakeasy.totp.verify({
      secret: user.twoFaSecret!,
      encoding: "base32",
      token: code,
      window: 1,
    })

    if (!isValid) throw new UnauthorizedException("Invalid 2FA code")

    await this.userService.update(userId, {
      isTwoFaEnabled: false,
      twoFaSecret: null,
    })

    return true
  }

  async verifyCode(userId: string, code: string): Promise<boolean> {
    const user = await this.userService.getById(userId)
    if (!user.twoFaSecret) throw new UnauthorizedException("No pending 2FA secret")

    const isValid = speakeasy.totp.verify({
      secret: user.twoFaSecret,
      encoding: "base32",
      token: code,
      window: 1,
    })
    if (!isValid) throw new UnauthorizedException("Invalid 2FA code")

    return true
  }
}
