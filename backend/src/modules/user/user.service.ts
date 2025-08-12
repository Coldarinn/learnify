import { Injectable, NotFoundException } from "@nestjs/common"
import { FileUpload } from "graphql-upload"
import mime from "mime"
import { Prisma, User } from "prisma/generated"
import { v4 as uuidv4 } from "uuid"

import { PrismaService } from "@/modules/prisma/prisma.service"

import { S3Service } from "../s3/s3.service"

import { CreateUserInput } from "./inputs/create-user.input"
import { FullUserModel } from "./models/full-user.model"

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly s3Service: S3Service
  ) {}

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

  async updateUserAvatar(userId: string, avatar: FileUpload): Promise<boolean> {
    const user = await this.getById(userId)
    const extension = mime.extension(avatar.mimetype) || "jpg"

    const key = `avatars/${userId}-${uuidv4()}.${extension}`

    try {
      await this.s3Service.uploadFile({
        stream: avatar.createReadStream(),
        key,
        contentType: avatar.mimetype,
        acl: "public-read",
      })

      if (user.avatarKey) await this.s3Service.deleteFile({ key: user.avatarKey }).catch((e) => console.error("Failed to delete old avatar", e))

      await this.update(userId, { avatarKey: key })

      return true
    } catch (error) {
      await this.s3Service.deleteFile({ key }).catch(() => {})
      throw error
    }
  }
}
