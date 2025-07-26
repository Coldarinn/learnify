import { Module } from "@nestjs/common"

import { SessionModule } from "@/modules/session/session.module"
import { UserModule } from "@/modules/user/user.module"

import { AuthResolver } from "./auth.resolver"
import { AuthService } from "./auth.service"

@Module({
  providers: [AuthResolver, AuthService],
  imports: [UserModule, SessionModule],
})
export class AuthModule {}
