import { Args, Mutation, Resolver } from "@nestjs/graphql"

import { Authorization } from "@/modules/auth/decorators/auth.decorator"
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator"

import { TwoFaService } from "./2fa.service"

@Resolver("TwoFa")
export class TwoFaResolver {
  constructor(private readonly twoFaService: TwoFaService) {}

  @Authorization()
  @Mutation(() => String)
  async generateTwoFaSecret(@CurrentUser("id") userId: string) {
    const { qrCodeDataURL } = await this.twoFaService.generateSecret(userId)
    return qrCodeDataURL
  }

  @Authorization()
  @Mutation(() => Boolean)
  enableTwoFa(@CurrentUser("id") userId: string, @Args("code") code: string): Promise<boolean> {
    return this.twoFaService.enable(userId, code)
  }

  @Authorization()
  @Mutation(() => Boolean)
  disableTwoFa(@CurrentUser("id") userId: string, @Args("code") code: string) {
    return this.twoFaService.disable(userId, code)
  }
}
