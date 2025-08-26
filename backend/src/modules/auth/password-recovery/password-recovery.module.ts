import { Module } from "@nestjs/common"

import { UserModule } from "@/modules/user/user.module"

import { PasswordRecoveryResolver } from "./password-recovery.resolver"
import { PasswordRecoveryService } from "./password-recovery.service"

@Module({
  providers: [PasswordRecoveryResolver, PasswordRecoveryService],
  imports: [UserModule],
})
export class PasswordRecoveryModule {}
