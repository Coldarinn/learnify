import { Args, Context, Mutation, Resolver } from "@nestjs/graphql"

import { GqlContext } from "@/shared/types/gql-context.types"

import { User } from "../user/entities/user.entity"

import { AuthService } from "./auth.service"
import { UserAgent } from "./decorators/user-agent.decorator"
import { SignInInput } from "./inputs/sign-in.input"
import { SignUpInput } from "./inputs/sign-up.input"

@Resolver("Auth")
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Boolean, { name: "signUp" })
  signUp(@Args("data") input: SignUpInput) {
    return this.authService.signUp(input)
  }

  @Mutation(() => User, { name: "signIn" })
  async signIn(@Context() { req }: GqlContext, @Args("data") input: SignInInput, @UserAgent() userAgent: string) {
    return this.authService.signIn(req, input, userAgent)
  }

  @Mutation(() => Boolean, { name: "signOut" })
  signOut(@Context() { req }: GqlContext) {
    return this.authService.signOut(req)
  }
}
