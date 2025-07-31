import { Prisma } from "prisma/generated"

export type FullUserModel = Prisma.UserGetPayload<{
  include: { oAuthAccounts: true; tokens: true }
}>
