import { Module } from "@nestjs/common"

import { TwoFaModule } from "@/modules/2fa/2fa.module"
import { S3Module } from "@/modules/s3/s3.module"
import { SessionModule } from "@/modules/session/session.module"
import { UserModule } from "@/modules/user/user.module"

import { AuthenticationResolver } from "./authentication.resolver"
import { AuthenticationService } from "./authentication.service"

@Module({
  providers: [AuthenticationResolver, AuthenticationService],
  imports: [UserModule, SessionModule, TwoFaModule, S3Module],
})
export class AuthenticationModule {}
