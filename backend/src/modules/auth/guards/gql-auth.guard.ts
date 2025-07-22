import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"

import { PrismaService } from "@/modules/prisma/prisma.service"
import { GqlContext } from "@/shared/types/gql-context.types"

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const request = ctx.getContext<GqlContext>().req

    if (typeof request.session.userId === "undefined") throw new UnauthorizedException("Unauthorized")

    const user = await this.prismaService.user.findUnique({
      where: {
        id: request.session.userId,
      },
    })

    if (!user) throw new UnauthorizedException("Unauthorized")

    request.user = user

    return true
  }
}
