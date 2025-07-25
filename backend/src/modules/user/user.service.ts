import { Injectable, NotFoundException } from "@nestjs/common"
import { User } from "prisma/generated"

import { PrismaService } from "@/modules/prisma/prisma.service"

import { CreateUserInput } from "./inputs/create-user.input"

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(input: CreateUserInput): Promise<User> {
    return this.prismaService.user.create({ data: input })
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

  async getById(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    })

    if (!user) throw new NotFoundException("User not found")

    return user
  }
}
