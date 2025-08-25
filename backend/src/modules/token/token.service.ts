import { BadRequestException, Injectable } from "@nestjs/common"
import { Prisma, Token, TokenType, User } from "prisma/generated"
import { v4 as uuidv4 } from "uuid"

import { PrismaService } from "@/modules/prisma/prisma.service"

import { CreateTokenInput } from "./inputs/create-token.input"

@Injectable()
export class TokenService {
  constructor(private readonly prismaService: PrismaService) {}

  async createForUser(input: CreateTokenInput, tx: Prisma.TransactionClient = this.prismaService): Promise<string> {
    const { userId, type } = input
    const { isUUID = true, expiresInMs = 300_000, tokenLength = 6 } = input.options || {}

    const token = isUUID
      ? uuidv4()
      : Math.floor(Math.random() * 10 ** tokenLength)
          .toString()
          .padStart(tokenLength, "0")

    const expiresAt = new Date(Date.now() + expiresInMs)

    await tx.token.deleteMany({ where: { type, userId } })
    await tx.token.create({
      data: {
        token,
        expiresAt,
        type,
        user: { connect: { id: userId } },
      },
    })

    return token
  }

  async validateToken(token: string, expectedType: TokenType): Promise<Token & { user: User }> {
    const tokenRecord = await this.prismaService.token.findUnique({
      where: { token },
      include: { user: true },
    })

    if (!tokenRecord || tokenRecord.type !== expectedType || tokenRecord.expiresAt < new Date()) {
      throw new BadRequestException("Invalid or expired token")
    }

    return tokenRecord
  }
}
