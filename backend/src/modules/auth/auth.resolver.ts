import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql"

import { UserModel } from "@/modules/user/models/user.model"
import { GqlContext } from "@/shared/types/gql-context.types"

import { AuthService } from "./auth.service"
import { Authorization } from "./decorators/auth.decorator"
import { UserAgent } from "./decorators/user-agent.decorator"
import { SignInInput } from "./inputs/sign-in.input"
import { SignUpInput } from "./inputs/sign-up.input"
import { SessionModel } from "./models/session.model"

@Resolver("Auth")
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

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
    return this.authService.signIn(req, input, userAgent)
  }

  @Mutation(() => Boolean)
  signOut(@Context() { req }: GqlContext): Promise<boolean> {
    return this.authService.signOut(req)
  }

  @Authorization()
  @Query(() => SessionModel)
  currentSession(@Context() { req }: GqlContext): Promise<SessionModel> {
    return this.authService.getCurrentSession(req)
  }

  @Authorization()
  @Query(() => [SessionModel])
  userSessions(@Context() { req }: GqlContext): Promise<SessionModel[]> {
    return this.authService.userSessions(req)
  }

  @Authorization()
  @Query(() => Boolean)
  deleteSession(@Context() { req }: GqlContext, @Args("sessionId") sessionId: string): Promise<boolean> {
    return this.authService.deleteSession(req, sessionId)
  }
}
