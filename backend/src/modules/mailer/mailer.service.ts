import { MailerService as NestMailerService } from "@nestjs-modules/mailer"
import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { render } from "@react-email/components"
import { SentMessageInfo } from "nodemailer"

import { ConfirmEmailInput } from "./inputs/confirm-email.input"
import { PasswordResetInput } from "./inputs/password-reset.input"
import { SendEmailInput } from "./inputs/send-email.input"
import ConfirmEmailTemplate from "./templates/confirm-email.template"
import PasswordResetTemplate from "./templates/password-reset.template"

@Injectable()
export class MailerService {
  private readonly clientUrl: string

  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: NestMailerService
  ) {
    this.clientUrl = this.configService.get<string>("CLIENT_URL")!
  }

  async sendConfirmEmail(input: ConfirmEmailInput): Promise<SentMessageInfo> {
    const { token, ...otherInput } = input

    const confirmationUrl = `${this.clientUrl}/confirm-email/${token}`
    const html = await render(ConfirmEmailTemplate({ confirmationUrl, ...otherInput }))

    return this.sendEmail({ to: input.to, html, subject: "Confirm your email" })
  }

  async sendPasswordResetEmail(input: PasswordResetInput): Promise<SentMessageInfo> {
    const { token, ...otherInput } = input

    const resetUrl = `${this.clientUrl}/password-reset/${token}`
    const html = await render(PasswordResetTemplate({ resetUrl, ...otherInput }))

    return this.sendEmail({ to: input.to, html, subject: "Password reset" })
  }

  private sendEmail(input: SendEmailInput): Promise<SentMessageInfo> {
    return this.mailerService.sendMail(input)
  }
}
