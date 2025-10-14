import { Args, Mutation, Resolver } from "@nestjs/graphql"

import { Authorization } from "@/modules/auth/decorators/auth.decorator"
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator"

import { CourseService } from "./course.service"
import { CreateCourseInput } from "./inputs/create-course.input"
import { CourseModel } from "./models/course.model"

@Resolver(() => CourseModel)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Authorization()
  @Mutation(() => Boolean)
  async createCourse(@CurrentUser("id") userId: string, @Args("data") data: CreateCourseInput): Promise<boolean> {
    await this.courseService.create(data, userId)
    return true
  }
}
