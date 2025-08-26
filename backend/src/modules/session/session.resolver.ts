import { ConflictException, NotFoundException } from "@nestjs/common"
import { Args, Context, Query, Resolver } from "@nestjs/graphql"

import { SessionModel } from "@/modules/session/models/session.model"
import { GqlContext } from "@/shared/types/gql-context.types"

import { Authorization } from "../auth/decorators/auth.decorator"

import { SessionService } from "./session.service"

@Resolver()
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) {}

  @Authorization()
  @Query(() => SessionModel)
  currentSession(@Context() { req }: GqlContext): Promise<SessionModel> {
    return this.sessionService.getById(req.session.id)
  }

  @Authorization()
  @Query(() => [SessionModel])
  userSessions(@Context() { req }: GqlContext): Promise<SessionModel[]> {
    if (!req.session.userId) throw new NotFoundException("Session not found")

    return this.sessionService.getAllByUser(req.session.userId)
  }

  @Authorization()
  @Query(() => Boolean)
  async terminateSession(@Context() { req }: GqlContext, @Args("sessionId") sessionId: string): Promise<boolean> {
    if (req.session.id === sessionId) throw new ConflictException("The current session cannot be deleted")

    const exists = await this.sessionService.exists(sessionId)
    if (!exists) throw new NotFoundException("Session not found")

    return this.sessionService.terminateById(sessionId)
  }
}
