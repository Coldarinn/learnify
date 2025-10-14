import { Module } from "@nestjs/common"

import { S3Service } from "../s3/s3.service"

import { CourseResolver } from "./course.resolver"
import { CourseService } from "./course.service"

@Module({
  providers: [CourseResolver, CourseService, S3Service],
})
export class CourseModule {}
