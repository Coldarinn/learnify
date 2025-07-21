import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"

import { PrismaService } from "@/modules/prisma/prisma.service"

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const request = ctx.getContext().req

    if (typeof request.session.userId === "undefined") throw new UnauthorizedException("Unauthorized")

    const user = await this.prismaService.user.findUnique({
      where: {
        id: request.session.userId,
      },
    })

    request.user = user

    return true
  }
}
