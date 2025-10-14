import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class CreateCourseInput {
  @Field(() => String)
  name: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => Number)
  numOfChapters: number

  @Field(() => Boolean)
  includeVideo: boolean

  @Field(() => String)
  difficultyLevel: "beginner" | "intermediate" | "advanced"

  @Field(() => String)
  category: string

  @Field(() => String)
  totalDuration: string

  @Field(() => [String])
  learningObjectives: string[]

  @Field(() => [String])
  prerequisites: string[]

  @Field(() => [ChapterInput])
  chapters: ChapterInput[]

  @Field(() => String)
  bannerBase64: string
}

class ChapterInput {
  @Field(() => String)
  name: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => String)
  duration: string

  @Field(() => [TopicInput])
  topics: TopicInput[]
}

class TopicInput {
  @Field(() => String)
  name: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => String)
  duration: string
}
