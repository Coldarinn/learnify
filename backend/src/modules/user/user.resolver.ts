import { Query, Resolver } from "@nestjs/graphql"

import { Authorization } from "@/modules/auth/decorators/auth.decorator"
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator"

import { UserModel } from "./models/user.model"
import { UserService } from "./user.service"

@Resolver("User")
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Authorization()
  @Query(() => UserModel)
  async me(@CurrentUser("id") id: string): Promise<UserModel> {
    const { password: _, ...safeUser } = await this.userService.getById(id)
    return safeUser
  }
}
