import { createParamDecorator, type ExecutionContext } from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"
import { Request } from "express"

import { UserModel } from "@/modules/user/models/user.model"
import { GqlContext } from "@/shared/types/gql-context.types"

export const CurrentUser = createParamDecorator((data: keyof UserModel, ctx: ExecutionContext) => {
  let user: UserModel

  if (ctx.getType() === "http") {
    user = ctx.switchToHttp().getRequest<Request>().user
  } else {
    const context = GqlExecutionContext.create(ctx)
    user = context.getContext<GqlContext>().req.user
  }

  return data ? user[data] : user
})
