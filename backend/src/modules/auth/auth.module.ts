import { Module } from "@nestjs/common"

import { SessionModule } from "@/modules/session/session.module"
import { UserModule } from "@/modules/user/user.module"

import { TwoFaModule } from "../2fa/2fa.module"

import { AuthResolver } from "./auth.resolver"
import { AuthService } from "./auth.service"
import { OAuthService } from "./oauth/oauth.service"

@Module({
  providers: [AuthResolver, AuthService, OAuthService],
  imports: [UserModule, SessionModule, TwoFaModule],
})
export class AuthModule {}
