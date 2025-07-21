import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"

import { User } from "./entities/user.entity"
import { CreateUserInput } from "./inputs/create-user.input"
import { UserService } from "./user.service"

@Resolver("User")
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  getAll() {
    return true
  }

  @Mutation(() => Boolean, { name: "createUser" })
  create(@Args("data") input: CreateUserInput) {
    return this.userService.create(input)
  }
}
