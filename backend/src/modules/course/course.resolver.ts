import { Args, Context, Mutation, Resolver } from "@nestjs/graphql"

import { GqlContext } from "@/shared/types/gql-context.types"

import { CourseService } from "./course.service"
import { CreateCourseInput } from "./inputs/create-course.input"
import { CourseModel } from "./models/course.model"

@Resolver(() => CourseModel)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Mutation(() => CourseModel)
  async createCourse(@Args("data") data: CreateCourseInput, @Context() ctx: GqlContext) {
    const userId = ctx.req.user.id
    return this.courseService.createCourse(data, userId)
  }
}
