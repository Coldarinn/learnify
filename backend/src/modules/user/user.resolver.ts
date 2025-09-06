import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { FileUpload, GraphQLUpload, Upload } from "graphql-upload"

import { Authorization } from "@/modules/auth/decorators/auth.decorator"
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator"
import { FileValidationPipe } from "@/shared/pipes/file-validation.pipe"

import { S3Service } from "../s3/s3.service"

import { ChangePasswordInput } from "./inputs/change-password.input"
import { UpdateProfileInput } from "./inputs/update-profile.input"
import { UserModel } from "./models/user.model"
import { UploadAvatarResponse } from "./responses/upload-avatar.response"
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

    if (user.avatarKey) safeUser.avatarUrl = await this.s3Service.getPresignedUrl({ key: user.avatarKey })

    return safeUser
  }

  @Authorization()
  @Mutation(() => Boolean)
  async updateProfile(@CurrentUser("id") userId: string, @Args("data") data: UpdateProfileInput): Promise<boolean> {
    return this.userService.updateProfile(userId, data)
  }

  @Authorization()
  @Mutation(() => UploadAvatarResponse)
  async uploadUserAvatar(
    @CurrentUser("id") userId: string,
    @Args("avatar", { type: () => GraphQLUpload }, new FileValidationPipe(2 * 1024 * 1024)) avatar: Upload
  ): Promise<Pick<UserModel, "avatarKey" | "avatarUrl">> {
    const avatarKey = await this.userService.updateUserAvatar(userId, avatar as unknown as FileUpload)
    const avatarUrl = await this.s3Service.getPresignedUrl({ key: avatarKey })
    return { avatarKey, avatarUrl }
  }

  @Authorization()
  @Mutation(() => Boolean)
  changePassword(@CurrentUser("id") userId: string, @Args("data") input: ChangePasswordInput): Promise<boolean> {
    return this.userService.changePassword(userId, input)
  }
}
