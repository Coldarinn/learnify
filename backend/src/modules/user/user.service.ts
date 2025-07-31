import { Injectable, NotFoundException } from "@nestjs/common"
import { Prisma, User } from "prisma/generated"

import { PrismaService } from "@/modules/prisma/prisma.service"

import { CreateUserInput } from "./inputs/create-user.input"
import { FullUserModel } from "./models/full-user.model"

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(input: CreateUserInput, tx: Prisma.TransactionClient = this.prismaService): Promise<User> {
    return tx.user.create({ data: input })
  }

  async findByLogin(login: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [{ username: { equals: login } }, { email: { equals: login } }],
      },
    })

    if (!user) throw new NotFoundException("User not found")

    return user
  }

  async getById(id: string): Promise<FullUserModel> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: { oAuthAccounts: true, tokens: true },
    })

    if (!user) throw new NotFoundException("User not found")

    return user
  }

  update(id: string, data: Partial<User>, tx: Prisma.TransactionClient = this.prismaService): Promise<User> {
    return tx.user.update({ where: { id }, data })
  }
}
