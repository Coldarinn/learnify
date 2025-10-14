import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Chapter, Course, Topic } from "prisma/generated"

@ObjectType()
export class CourseModel implements Course {
  @Field(() => ID)
  id: string

  @Field(() => String)
  name: string

  @Field(() => String, { nullable: true })
  description: string | null

  @Field(() => Number)
  numOfChapters: number

  @Field(() => Boolean)
  includeVideo: boolean

  @Field(() => String)
  difficultyLevel: "beginner" | "intermediate" | "advanced"

  @Field(() => String)
  category: string

  @Field(() => String)
  bannerImageKey: string

  @Field(() => String)
  totalDuration: string

  @Field(() => [String])
  learningObjectives: string[]

  @Field(() => [String])
  prerequisites: string[]

  @Field(() => String)
  authorId: string

  @Field(() => [ChapterModel])
  chapters: ChapterModel[]

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date
}

@ObjectType()
export class ChapterModel implements Chapter {
  @Field(() => ID)
  id: string

  @Field(() => String)
  name: string

  @Field(() => String, { nullable: true })
  description: string | null

  @Field(() => String)
  duration: string

  @Field(() => String)
  courseId: string

  @Field(() => [TopicModel])
  topics: TopicModel[]

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date
}

@ObjectType()
export class TopicModel implements Topic {
  @Field(() => ID)
  id: string

  @Field(() => String)
  name: string

  @Field(() => String, { nullable: true })
  description: string | null

  @Field(() => String)
  duration: string

  @Field(() => String)
  chapterId: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date
}
