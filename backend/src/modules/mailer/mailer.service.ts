import { MailerService as NestMailerService } from "@nestjs-modules/mailer"
import { Injectable } from "@nestjs/common"

import { SendEmailInput } from "./inputs/send-email.input"

@Injectable()
export class MailerService {
  constructor(private readonly mailerService: NestMailerService) {}

  sendEmail(input: SendEmailInput) {
    return this.mailerService.sendMail(input)
  }
}
