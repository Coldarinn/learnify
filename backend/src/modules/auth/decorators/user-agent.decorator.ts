import { createParamDecorator, type ExecutionContext } from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"
import { Request } from "express"

import { GqlContext } from "@/shared/types/gql-context.types"

export const UserAgent = createParamDecorator((_, ctx: ExecutionContext) => {
  if (ctx.getType() === "http") {
    const request = ctx.switchToHttp().getRequest<Request>()

    return request.headers["user-agent"]
  } else {
    const context = GqlExecutionContext.create(ctx)

    return context.getContext<GqlContext>().req.headers["user-agent"]
  }
})
