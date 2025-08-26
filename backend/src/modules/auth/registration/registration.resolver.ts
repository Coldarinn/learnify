import { Args, Mutation, Resolver } from "@nestjs/graphql"

import { SignUpInput } from "./inputs/sign-up.input"
import { RegistrationService } from "./registration.service"

@Resolver()
export class RegistrationResolver {
  constructor(private readonly registrationService: RegistrationService) {}

  @Mutation(() => Boolean)
  signUp(@Args("data") input: SignUpInput): Promise<boolean> {
    return this.registrationService.signUp(input)
  }

  @Mutation(() => Boolean)
  reSendConfirmEmail(@Args("oldToken") oldToken: string): Promise<boolean> {
    return this.registrationService.reSendConfirmEmail(oldToken)
  }

  @Mutation(() => Boolean)
  confirmEmail(@Args("token") token: string): Promise<boolean> {
    return this.registrationService.confirmEmail(token)
  }
}
