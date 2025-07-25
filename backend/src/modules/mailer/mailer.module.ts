import { MailerModule as NestMailerModule } from "@nestjs-modules/mailer"
import { Global, Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"

import { parseBoolean } from "@/shared/utils/parse-boolean.util"

import { MailerService } from "./mailer.service"

@Global()
@Module({
  imports: [
    NestMailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get("MAIL_HOST"),
          port: configService.get("MAIL_PORT"),
          secure: parseBoolean(configService.get("MAIL_SECURE")),
          auth: {
            user: configService.get("MAIL_LOGIN"),
            pass: configService.get("MAIL_PASSWORD"),
          },
        },
        defaults: {
          from: `"Tessera" ${configService.get("MAIL_LOGIN")}`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
