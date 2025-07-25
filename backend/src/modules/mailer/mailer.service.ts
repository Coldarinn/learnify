import { MailerService as NestMailerService } from "@nestjs-modules/mailer"
import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { render } from "@react-email/components"
import { SentMessageInfo } from "nodemailer"

import { ConfirmEmailInput } from "./inputs/confirm-email.input"
import { SendEmailInput } from "./inputs/send-email.input"
import ConfirmEmailTemplate from "./templates/confirm-email.template"

@Injectable()
export class MailerService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: NestMailerService
  ) {}

  async sendConfirmEmail(input: ConfirmEmailInput): Promise<SentMessageInfo> {
    const { token, ...otherInput } = input

    const clientUrl = this.configService.get<string>("CLIENT_URL")
    const confirmationUrl = `${clientUrl}/confirm-email/${token}`
    const html = await render(ConfirmEmailTemplate({ confirmationUrl, ...otherInput }))

    return this.sendEmail({ to: input.to, html, subject: "Confirm your email" })
  }

  private sendEmail(input: SendEmailInput): Promise<SentMessageInfo> {
    return this.mailerService.sendMail(input)
  }
}
