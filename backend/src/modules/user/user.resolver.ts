import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"

import { Authorization } from "@/modules/auth/decorators/auth.decorator"
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator"

import { CreateUserInput } from "./inputs/create-user.input"
import { UserModel } from "./models/user.model"
import { UserService } from "./user.service"

@Resolver("User")
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => Boolean, { name: "createUser" })
  create(@Args("data") input: CreateUserInput) {
    return this.userService.create(input)
  }

  @Authorization()
  @Query(() => UserModel, { name: "currentUser" })
  me(@CurrentUser("id") id: string) {
    return this.userService.getById(id)
  }
}
