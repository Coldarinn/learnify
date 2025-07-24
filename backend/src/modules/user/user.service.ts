import { ConflictException, Injectable, NotFoundException } from "@nestjs/common"
import { hash } from "argon2"
import { User } from "prisma/generated"

import { PrismaService } from "@/modules/prisma/prisma.service"

import { CreateUserInput } from "./inputs/create-user.input"
import { UserModel } from "./models/user.model"

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(input: CreateUserInput): Promise<boolean> {
    const { username, email, password } = input

    const isUsernameExists = await this.prismaService.user.findUnique({ where: { username } })

    if (isUsernameExists) throw new ConflictException("Username already in use")

    const isEmailExists = await this.prismaService.user.findUnique({ where: { email } })

    if (isEmailExists) throw new ConflictException("Email already in use")

    await this.prismaService.user.create({
      data: {
        username,
        email,
        password: await hash(password),
      },
    })

    return true
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

  async getById(id: string): Promise<UserModel> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      omit: { password: true },
    })

    if (!user) throw new NotFoundException("User not found")

    return user
  }
}
