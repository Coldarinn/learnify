import { Query, Resolver } from "@nestjs/graphql"

import { Authorization } from "@/modules/auth/decorators/auth.decorator"
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator"

import { UserModel } from "./models/user.model"
import { UserService } from "./user.service"
import { toSafeUser } from "./utils/to-safe-user.util"

@Resolver("User")
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Authorization()
  @Query(() => UserModel)
  async me(@CurrentUser("id") userId: string): Promise<UserModel> {
    return toSafeUser(await this.userService.getById(userId))
  }
}
