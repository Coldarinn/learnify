import { Injectable } from "@nestjs/common"
import { Prisma } from "prisma/generated"
import { v4 as uuidv4 } from "uuid"

import { PrismaService } from "@/modules/prisma/prisma.service"

import { GenerateTokenInput } from "./inputs/generate-token.input"

@Injectable()
export class TokenService {
  constructor(private readonly prismaService: PrismaService) {}

  async generateToken(input: GenerateTokenInput, tx: Prisma.TransactionClient = this.prismaService): Promise<string> {
    const { userId, type } = input
    const { isUUID = true, expiresInMs = 5 * 60 * 1000, tokenLength = 6 } = input.options || {}

    const token = isUUID
      ? uuidv4()
      : Math.floor(Math.random() * 10 ** tokenLength)
          .toString()
          .padStart(tokenLength, "0")

    const expiresIn = new Date(Date.now() + expiresInMs)

    await tx.token.deleteMany({ where: { type, userId } })
    await tx.token.create({
      data: {
        token,
        expiresIn,
        type,
        user: { connect: { id: userId } },
      },
    })

    return token
  }
}
