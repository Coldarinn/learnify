import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql"

import { SessionModel } from "@/modules/session/models/session.model"
import { UserModel } from "@/modules/user/models/user.model"
import { GqlContext } from "@/shared/types/gql-context.types"

import { AuthService } from "./auth.service"
import { Authorization } from "./decorators/auth.decorator"
import { UserAgent } from "./decorators/user-agent.decorator"
import { SignInInput } from "./inputs/sign-in.input"
import { SignUpInput } from "./inputs/sign-up.input"

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
    return this.authService.signIn(input, req.session, req.headers, req.ip, userAgent)
  }

  @Mutation(() => Boolean)
  signOut(@Context() { req }: GqlContext): Promise<boolean> {
    return this.authService.signOut(req)
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
