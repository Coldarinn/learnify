import { Args, Context, Mutation, Resolver } from "@nestjs/graphql"

import { S3Service } from "@/modules/s3/s3.service"
import { UserModel } from "@/modules/user/models/user.model"
import { toSafeUser } from "@/modules/user/utils/to-safe-user.util"
import { GqlContext } from "@/shared/types/gql-context.types"

import { UserAgent } from "../decorators/user-agent.decorator"

import { AuthenticationService } from "./authentication.service"
import { SignInInput } from "./inputs/sign-in.input"

@Resolver()
export class AuthenticationResolver {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly s3Service: S3Service
  ) {}

  @Mutation(() => UserModel)
  async signIn(@Context() { req }: GqlContext, @Args("data") input: SignInInput, @UserAgent() userAgent: string): Promise<UserModel> {
    const user = await this.authenticationService.signIn(input, req.session, req.headers, req.ip, userAgent)
    const safeUser = toSafeUser(user)

    if (user.avatarKey) safeUser.avatarUrl = await this.s3Service.getPresignedUrl({ key: user.avatarKey })

    return safeUser
  }

  @Mutation(() => Boolean)
  signOut(@Context() { req }: GqlContext): Promise<boolean> {
    return this.authenticationService.signOut(req)
  }
}
