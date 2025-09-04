import { Module } from "@nestjs/common"

import { S3Service } from "@/modules/s3/s3.service"

import { UserService } from "../user.service"

import { EmailChangeResolver } from "./email-change.resolver"
import { EmailChangeService } from "./email-change.service"

@Module({
  providers: [EmailChangeResolver, EmailChangeService, UserService, S3Service],
})
export class EmailChangeModule {}
