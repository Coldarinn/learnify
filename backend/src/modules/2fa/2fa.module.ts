import { Module } from "@nestjs/common"

import { UserModule } from "../user/user.module"

import { TwoFaResolver } from "./2fa.resolver"
import { TwoFaService } from "./2fa.service"

@Module({
  providers: [TwoFaResolver, TwoFaService],
  exports: [TwoFaService],
  imports: [UserModule],
})
export class TwoFaModule {}
