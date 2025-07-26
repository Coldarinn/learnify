import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { GqlExecutionContext } from "@nestjs/graphql"

import { PrismaService } from "@/modules/prisma/prisma.service"
import { GqlContext } from "@/shared/types/gql-context.types"

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const req = ctx.getContext<GqlContext>().req

    if (typeof req.session?.userId === "undefined") await this.terminateSession(req)

    const user = await this.prismaService.user.findUnique({
      where: {
        id: req.session?.userId,
      },
    })

    if (!user) await this.terminateSession(req)

    req.user = user!

    return true
  }

  private async terminateSession(req: GqlContext["req"]) {
    await new Promise<void>((resolve) => {
      req.session.destroy(() => {
        req.res?.clearCookie(this.configService.get("SESSION_NAME")!)
        resolve()
      })
    })

    throw new UnauthorizedException("Unauthorized")
  }
}
