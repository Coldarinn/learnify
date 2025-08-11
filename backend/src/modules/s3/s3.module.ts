import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"

import { UserModule } from "../user/user.module"

import { S3Service } from "./s3.service"

@Module({
  imports: [ConfigModule, UserModule],
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {}
