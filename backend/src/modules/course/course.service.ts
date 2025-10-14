import { Injectable } from "@nestjs/common"
import mime from "mime"
import { Readable } from "stream"
import { v4 as uuidv4 } from "uuid"

import { PrismaService } from "@/modules/prisma/prisma.service"
import { S3Service } from "@/modules/s3/s3.service"

import { CreateCourseInput } from "./inputs/create-course.input"

@Injectable()
export class CourseService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly s3Service: S3Service
  ) {}

  async create(input: CreateCourseInput, userId: string): Promise<boolean> {
    const { bannerBase64 } = input

    const { stream, contentType } = this.base64ToStream(bannerBase64)
    const extension = mime.extension(contentType)

    const key = `courses/${userId}/${uuidv4()}.${extension}`

    try {
      await this.s3Service.uploadFile({
        stream,
        key,
        contentType,
        acl: "public-read",
      })

      await this.prismaService.course.create({
        data: {
          name: input.name,
          description: input.description,
          category: input.category,
          difficultyLevel: input.difficultyLevel,
          includeVideo: input.includeVideo,
          bannerImageKey: key,
          duration: input.duration,
          learningObjectives: input.learningObjectives,
          prerequisites: input.prerequisites,
          numOfChapters: input.numOfChapters,
          authorId: userId,
          chapters: {
            create: input.chapters.map((ch) => ({
              name: ch.name,
              description: ch.description,
              duration: ch.duration,
              topics: {
                create: ch.topics.map((t) => ({
                  name: t.name,
                  description: t.description,
                  duration: t.duration,
                })),
              },
            })),
          },
        },
      })

      return true
    } catch (error) {
      await this.s3Service.deleteFile({ key }).catch(() => {})
      throw error
    }
  }

  private base64ToStream(base64: string): { stream: Readable; contentType: string } {
    const matches = base64.match(/^data:(.+);base64,(.+)$/)
    let buffer: Buffer
    let contentType: string

    if (matches) {
      contentType = matches[1]
      buffer = Buffer.from(matches[2], "base64")
    } else {
      buffer = Buffer.from(base64, "base64")
      contentType = "application/octet-stream"
    }

    const stream = new Readable()
    stream.push(buffer)
    stream.push(null)

    return { stream, contentType }
  }
}
