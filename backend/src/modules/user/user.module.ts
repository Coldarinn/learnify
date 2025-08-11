import { Module } from "@nestjs/common"

import { S3Service } from "../s3/s3.service"

import { UserResolver } from "./user.resolver"
import { UserService } from "./user.service"

@Module({
  providers: [UserResolver, UserService, S3Service],
  exports: [UserService],
})
export class UserModule {}
