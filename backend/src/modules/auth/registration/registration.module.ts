import { Module } from "@nestjs/common"

import { UserModule } from "@/modules/user/user.module"

import { RegistrationResolver } from "./registration.resolver"
import { RegistrationService } from "./registration.service"

@Module({
  providers: [RegistrationResolver, RegistrationService],
  imports: [UserModule],
})
export class RegistrationModule {}
