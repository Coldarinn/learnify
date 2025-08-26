import { Module } from "@nestjs/common"

import { UserModule } from "@/modules/user/user.module"

import { EmailChangeResolver } from "./email-change.resolver"
import { EmailChangeService } from "./email-change.service"

@Module({
  providers: [EmailChangeResolver, EmailChangeService],
  imports: [UserModule],
})
export class EmailChangeModule {}
