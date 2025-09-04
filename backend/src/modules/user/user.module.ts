import { Module } from "@nestjs/common"

import { S3Service } from "../s3/s3.service"

import { EmailChangeModule } from "./email-change/email-change.module"
import { UserResolver } from "./user.resolver"
import { UserService } from "./user.service"

@Module({
  providers: [UserResolver, UserService, S3Service],
  exports: [UserService],
  imports: [EmailChangeModule],
})
export class UserModule {}
