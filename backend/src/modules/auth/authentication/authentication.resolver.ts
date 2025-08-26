import { Args, Context, Mutation, Resolver } from "@nestjs/graphql"

import { UserModel } from "@/modules/user/models/user.model"
import { GqlContext } from "@/shared/types/gql-context.types"

import { UserAgent } from "../decorators/user-agent.decorator"

import { AuthenticationService } from "./authentication.service"
import { SignInInput } from "./inputs/sign-in.input"

@Resolver()
export class AuthenticationResolver {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Mutation(() => UserModel)
  signIn(@Context() { req }: GqlContext, @Args("data") input: SignInInput, @UserAgent() userAgent: string): Promise<UserModel> {
    return this.authenticationService.signIn(input, req.session, req.headers, req.ip, userAgent)
  }

  @Mutation(() => Boolean)
  signOut(@Context() { req }: GqlContext): Promise<boolean> {
    return this.authenticationService.signOut(req)
  }
}
