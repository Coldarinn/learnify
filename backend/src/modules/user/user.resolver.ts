import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"

import { Authorization } from "../auth/decorators/auth.decorator"

import { CurrentUser } from "./../auth/decorators/current-user.decorator"
import { User } from "./entities/user.entity"
import { CreateUserInput } from "./inputs/create-user.input"
import { UserService } from "./user.service"

@Resolver("User")
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => Boolean, { name: "createUser" })
  create(@Args("data") input: CreateUserInput) {
    return this.userService.create(input)
  }

  @Authorization()
  @Query(() => User, { name: "currentUser" })
  me(@CurrentUser("id") id: string) {
    return this.userService.me(id)
  }
}
