import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common"
import { hash, verify } from "argon2"
import { FileUpload } from "graphql-upload"
import mime from "mime"
import { Prisma, User } from "prisma/generated"
import { v4 as uuidv4 } from "uuid"

import { PrismaService } from "@/modules/prisma/prisma.service"

import { S3Service } from "../s3/s3.service"

import { ChangePasswordInput } from "./inputs/change-password.input"
import { CreateUserInput } from "./inputs/create-user.input"
import { UpdateProfileInput } from "./inputs/update-profile.input"
import { FullUserModel } from "./models/full-user.model"

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly s3Service: S3Service
  ) {}

  async create(input: CreateUserInput, tx: Prisma.TransactionClient = this.prismaService): Promise<FullUserModel> {
    return tx.user.create({ data: input, include: { oAuthAccounts: true, tokens: true } })
  }

  async findByLogin(login: string): Promise<FullUserModel> {
    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [{ username: { equals: login } }, { email: { equals: login } }],
      },
      include: { oAuthAccounts: true, tokens: true },
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

  update(id: string, data: Partial<User>, tx: Prisma.TransactionClient = this.prismaService): Promise<FullUserModel> {
    return tx.user.update({ where: { id }, data, include: { oAuthAccounts: true, tokens: true } })
  }

  async updateProfile(userId: string, data: UpdateProfileInput): Promise<boolean> {
    const existingUser = await this.prismaService.user.findUnique({ where: { id: userId } })
    if (!existingUser) throw new NotFoundException("User not found")

    if (data.username && data.username !== existingUser.username) {
      const usernameExists = await this.prismaService.user.findUnique({ where: { username: data.username } })
      if (usernameExists) throw new ConflictException("Username already in use")
    }

    await this.update(userId, data)

    return true
  }

  async updateUserAvatar(userId: string, avatar: FileUpload): Promise<string> {
    const user = await this.getById(userId)
    const extension = mime.extension(avatar.mimetype)

    const key = `avatars/${userId}-${uuidv4()}.${extension}`

    const stream = avatar.createReadStream()

    try {
      await this.s3Service.uploadFile({
        stream,
        key,
        contentType: avatar.mimetype,
        acl: "public-read",
      })

      if (user.avatarKey) await this.s3Service.deleteFile({ key: user.avatarKey }).catch((e) => console.error("Failed to delete old avatar", e))

      await this.update(userId, { avatarKey: key, avatarUrl: null })

      return key
    } catch (error) {
      await this.s3Service.deleteFile({ key }).catch(() => {})
      throw error
    }
  }

  async changePassword(userId: string, input: ChangePasswordInput): Promise<boolean> {
    const { currentPassword, newPassword } = input

    const user = await this.getById(userId)

    if ((!user.password && user.oAuthAccounts.length === 0) || user.password) {
      const isMatch = await verify(user.password, currentPassword)
      if (!isMatch) throw new UnauthorizedException("Current password is incorrect")
    }

    const hashedNewPassword = await hash(newPassword)

    await this.update(userId, { password: hashedNewPassword })

    return true
  }
}
