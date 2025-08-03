import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql"

import { SessionModel } from "@/modules/session/models/session.model"
import { UserModel } from "@/modules/user/models/user.model"
import { GqlContext } from "@/shared/types/gql-context.types"

import { AuthService } from "./auth.service"
import { Authorization } from "./decorators/auth.decorator"
import { CurrentUser } from "./decorators/current-user.decorator"
import { UserAgent } from "./decorators/user-agent.decorator"
import { ChangeEmailInput } from "./inputs/change-email.input"
import { ChangePasswordInput } from "./inputs/change-password.input"
import { ConfirmEmailChangeInput } from "./inputs/confirm-email-change.input"
import { RequestPasswordResetInput } from "./inputs/request-password-reset.input"
import { ResetPasswordInput } from "./inputs/reset-password.input"
import { SignInInput } from "./inputs/sign-in.input"
import { SignUpInput } from "./inputs/sign-up.input"
import { OAuthSignInInput } from "./oauth/inputs/oauth-sign-in.input"
import { OAuthUnlinkInput } from "./oauth/inputs/oauth-unlink.input"
import { OAuthService } from "./oauth/oauth.service"

@Resolver("Auth")
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly oauthService: OAuthService
  ) {}

  @Mutation(() => Boolean)
  signUp(@Args("data") input: SignUpInput): Promise<boolean> {
    return this.authService.signUp(input)
  }

  @Mutation(() => Boolean)
  confirmEmail(@Args("token") token: string): Promise<boolean> {
    return this.authService.confirmEmail(token)
  }

  @Mutation(() => UserModel)
  signIn(@Context() { req }: GqlContext, @Args("data") input: SignInInput, @UserAgent() userAgent: string): Promise<UserModel> {
    return this.authService.signIn(input, req.session, req.headers, req.ip, userAgent)
  }

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

  @Mutation(() => Boolean)
  signOut(@Context() { req }: GqlContext): Promise<boolean> {
    return this.authService.signOut(req)
  }

  @Mutation(() => Boolean)
  requestPasswordReset(
    @Context() { req }: GqlContext,
    @Args("data") input: RequestPasswordResetInput,
    @UserAgent() userAgent: string
  ): Promise<boolean> {
    return this.authService.requestPasswordReset(req.headers, req.ip, userAgent, input.email)
  }

  @Mutation(() => Boolean)
  resetPassword(@Args("data") input: ResetPasswordInput): Promise<boolean> {
    return this.authService.resetPassword(input.token, input.newPassword)
  }

  @Authorization()
  @Mutation(() => Boolean)
  changePassword(@CurrentUser("id") userId: string, @Args("data") input: ChangePasswordInput): Promise<boolean> {
    return this.authService.changePassword(userId, input)
  }

  @Authorization()
  @Mutation(() => Boolean)
  requestEmailChange(
    @Context() { req }: GqlContext,
    @UserAgent() userAgent: string,
    @CurrentUser("id") userId: string,
    @Args("data") input: ChangeEmailInput
  ): Promise<boolean> {
    return this.authService.requestEmailChange(req.headers, req.ip, userAgent, userId, input)
  }

  @Mutation(() => Boolean)
  confirmEmailChange(@Args("data") { token, email }: ConfirmEmailChangeInput): Promise<boolean> {
    return this.authService.confirmEmailChange(token, email)
  }

  @Authorization()
  @Query(() => SessionModel)
  currentSession(@Context() { req }: GqlContext): Promise<SessionModel> {
    return this.authService.getCurrentSession(req.session.id)
  }

  @Authorization()
  @Query(() => [SessionModel])
  userSessions(@Context() { req }: GqlContext): Promise<SessionModel[]> {
    return this.authService.getUserSessions(req.session.userId)
  }

  @Authorization()
  @Query(() => Boolean)
  terminateSession(@Context() { req }: GqlContext, @Args("sessionId") sessionId: string): Promise<boolean> {
    return this.authService.terminateSession(req.session, sessionId)
  }
}
