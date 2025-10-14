import { Injectable } from "@nestjs/common"

import { PrismaService } from "@/modules/prisma/prisma.service"

import { CreateCourseInput } from "./inputs/create-course.input"

@Injectable()
export class CourseService {
  constructor(private prismaService: PrismaService) {}

  async createCourse(input: CreateCourseInput, authorId: string) {
    const { bannerBase64, chapters, ...courseData } = input

    const bannerImageKey = `courses/${authorId}-${Date.now()}.png`
    const bannerImageUrl = await this.uploadBanner(bannerImageKey, bannerBase64)

    const createdCourse = await this.prismaService.course.create({
      data: {
        ...courseData,
        bannerImageKey,
        bannerImageUrl,
        authorId,
        chapters: {
          create: chapters.map((chapter) => ({
            ...chapter,
            topics: { create: chapter.topics },
          })),
        },
      },
      include: {
        chapters: { include: { topics: true } },
      },
    })

    return createdCourse
  }
}
