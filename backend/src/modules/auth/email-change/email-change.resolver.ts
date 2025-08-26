import { Args, Context, Mutation, Resolver } from "@nestjs/graphql"

import { GqlContext } from "@/shared/types/gql-context.types"

import { Authorization } from "../decorators/auth.decorator"
import { CurrentUser } from "../decorators/current-user.decorator"
import { UserAgent } from "../decorators/user-agent.decorator"

import { EmailChangeService } from "./email-change.service"
import { ChangeEmailInput } from "./inputs/change-email.input"
import { ConfirmEmailChangeInput } from "./inputs/confirm-email-change.input"

@Resolver()
export class EmailChangeResolver {
  constructor(private readonly emailChangeService: EmailChangeService) {}

  @Authorization()
  @Mutation(() => Boolean)
  requestEmailChange(
    @Context() { req }: GqlContext,
    @UserAgent() userAgent: string,
    @CurrentUser("id") userId: string,
    @Args("data") input: ChangeEmailInput
  ): Promise<boolean> {
    return this.emailChangeService.requestEmailChange(req.headers, req.ip, userAgent, userId, input)
  }

  @Mutation(() => Boolean)
  confirmEmailChange(@Args("data") { token, email }: ConfirmEmailChangeInput): Promise<boolean> {
    return this.emailChangeService.confirmEmailChange(token, email)
  }
}
