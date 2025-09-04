import { Args, Context, Mutation, Resolver } from "@nestjs/graphql"

import { GqlContext } from "@/shared/types/gql-context.types"

import { UserAgent } from "../decorators/user-agent.decorator"

import { RequestPasswordResetInput } from "./inputs/request-password-reset.input"
import { ResetPasswordInput } from "./inputs/reset-password.input"
import { PasswordRecoveryService } from "./password-recovery.service"

@Resolver()
export class PasswordRecoveryResolver {
  constructor(private readonly passwordRecoveryService: PasswordRecoveryService) {}

  @Mutation(() => Boolean)
  requestPasswordReset(
    @Context() { req }: GqlContext,
    @Args("data") input: RequestPasswordResetInput,
    @UserAgent() userAgent: string
  ): Promise<boolean> {
    return this.passwordRecoveryService.requestPasswordReset(req.headers, req.ip, userAgent, input.email)
  }

  @Mutation(() => Boolean)
  resetPassword(@Args("data") input: ResetPasswordInput): Promise<boolean> {
    return this.passwordRecoveryService.resetPassword(input.token, input.newPassword)
  }
}
