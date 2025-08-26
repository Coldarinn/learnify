import { Args, Context, Mutation, Resolver } from "@nestjs/graphql"

import { GqlContext } from "@/shared/types/gql-context.types"

import { Authorization } from "../decorators/auth.decorator"
import { CurrentUser } from "../decorators/current-user.decorator"
import { UserAgent } from "../decorators/user-agent.decorator"

import { ChangePasswordInput } from "./inputs/change-password.input"
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

  @Authorization()
  @Mutation(() => Boolean)
  changePassword(@CurrentUser("id") userId: string, @Args("data") input: ChangePasswordInput): Promise<boolean> {
    return this.passwordRecoveryService.changePassword(userId, input)
  }
}
