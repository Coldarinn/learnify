import { Args, Context, Mutation, Resolver } from "@nestjs/graphql"

import { UserModel } from "@/modules/user/models/user.model"
import { GqlContext } from "@/shared/types/gql-context.types"

import { Authorization } from "../decorators/auth.decorator"
import { CurrentUser } from "../decorators/current-user.decorator"
import { UserAgent } from "../decorators/user-agent.decorator"

import { OAuthSignInInput } from "./inputs/oauth-sign-in.input"
import { OAuthUnlinkInput } from "./inputs/oauth-unlink.input"
import { OAuthService } from "./oauth.service"

@Resolver("OAuth")
export class OAuthResolver {
  constructor(private readonly oauthService: OAuthService) {}

  @Mutation(() => UserModel)
  async signInOAuth(@Context() { req }: GqlContext, @Args("data") input: OAuthSignInInput, @UserAgent() userAgent: string): Promise<UserModel> {
    const { code, provider } = input

    return await this.oauthService.signInOAuth(code, provider, req.session, req.headers, req.ip, userAgent)
  }

  @Authorization()
  @Mutation(() => UserModel)
  async linkOAuthAccount(@CurrentUser("id") userId: string, @Args("data") input: OAuthSignInInput): Promise<boolean> {
    const { code, provider } = input

    return await this.oauthService.linkOAuthAccount(userId, code, provider)
  }

  @Authorization()
  @Mutation(() => Boolean)
  async unlinkOAuthAccount(@CurrentUser("id") userId: string, @Args("data") { provider }: OAuthUnlinkInput): Promise<boolean> {
    return this.oauthService.unlinkOAuthAccount(userId, provider)
  }
}
