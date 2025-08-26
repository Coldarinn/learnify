import { Module } from "@nestjs/common"

import { SessionModule } from "@/modules/session/session.module"
import { UserModule } from "@/modules/user/user.module"

import { OAuthResolver } from "./oauth.resolver"
import { OAuthService } from "./oauth.service"

@Module({
  providers: [OAuthResolver, OAuthService],
  imports: [UserModule, SessionModule],
})
export class OAuthModule {}
