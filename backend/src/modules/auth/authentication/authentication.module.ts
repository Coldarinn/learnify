import { Module } from "@nestjs/common"

import { TwoFaModule } from "@/modules/2fa/2fa.module"
import { SessionModule } from "@/modules/session/session.module"
import { UserModule } from "@/modules/user/user.module"

import { AuthenticationResolver } from "./authentication.resolver"
import { AuthenticationService } from "./authentication.service"

@Module({
  providers: [AuthenticationResolver, AuthenticationService],
  imports: [UserModule, SessionModule, TwoFaModule],
})
export class AuthenticationModule {}
