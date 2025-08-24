import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { FileUpload, GraphQLUpload, Upload } from "graphql-upload"

import { Authorization } from "@/modules/auth/decorators/auth.decorator"
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator"
import { FileValidationPipe } from "@/shared/pipes/file-validation.pipe"

import { S3Service } from "../s3/s3.service"

import { UserModel } from "./models/user.model"
import { UserService } from "./user.service"
import { toSafeUser } from "./utils/to-safe-user.util"

@Resolver("User")
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly s3Service: S3Service
  ) {}

  @Authorization()
  @Query(() => UserModel)
  async me(@CurrentUser("id") userId: string): Promise<UserModel> {
    const user = await this.userService.getById(userId)
    const safeUser = toSafeUser(user)

    if (user.avatarKey && !safeUser.avatarUrl) safeUser.avatarUrl = await this.s3Service.getPresignedUrl({ key: user.avatarKey })

    return safeUser
  }

  @Authorization()
  @Mutation(() => Boolean)
  uploadUserAvatar(
    @CurrentUser("id") userId: string,
    @Args("avatar", { type: () => GraphQLUpload }, new FileValidationPipe(2 * 1024 * 1024)) avatar: Upload
  ): Promise<boolean> {
    return this.userService.updateUserAvatar(userId, avatar as unknown as FileUpload)
  }
}
