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

  async updateUserAvatar(userId: string, file: Promise<FileUpload>): Promise<boolean> {
    const user = await this.getById(userId)

    const uploadedFile = await file
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { createReadStream, mimetype } = uploadedFile

    const stream = createReadStream()
    const extension = mime.extension(mimetype) || "jpg"
    const key = `avatars/${userId}-${uuidv4()}.${extension}`

    const chunks: Buffer[] = []
    for await (const chunk of stream) chunks.push(chunk as Buffer)
    const buffer = Buffer.concat(chunks)

    await this.s3Service.uploadFile({
      buffer,
      key,
      contentType: mimetype,
      acl: "public-read",
    })

    if (user.avatarKey) {
      await this.s3Service.deleteFile({ key: user.avatarKey }).catch((e) => {
        console.warn("Failed to delete old avatar", e)
      })
    }

    await this.update(userId, { avatarUrl: await this.s3Service.getPresignedUrl({ key }) })
    return true
  }
}
