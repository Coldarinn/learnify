import { Module } from "@nestjs/common"

import { S3Module } from "@/modules/s3/s3.module"
import { SessionModule } from "@/modules/session/session.module"
import { UserModule } from "@/modules/user/user.module"

import { OAuthResolver } from "./oauth.resolver"
import { OAuthService } from "./oauth.service"

@Module({
  providers: [OAuthResolver, OAuthService],
  imports: [UserModule, SessionModule, S3Module],
})
export class OAuthModule {}
