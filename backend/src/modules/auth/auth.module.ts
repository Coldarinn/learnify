import { Module } from "@nestjs/common"

import { UserModule } from "@/modules/user/user.module"

import { AuthResolver } from "./auth.resolver"
import { AuthService } from "./auth.service"

@Module({
  providers: [AuthResolver, AuthService],
  imports: [UserModule],
})
export class AuthModule {}
