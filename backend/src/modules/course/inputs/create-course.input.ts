import { Field, InputType } from "@nestjs/graphql"
import { Type } from "class-transformer"
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsIn,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  ValidateIf,
  ValidateNested,
} from "class-validator"

@InputType()
export class CreateCourseInput {
  @Field(() => String)
  @IsString()
  @MaxLength(60)
  name: string

  @Field(() => String, { nullable: true })
  @IsString()
  @ValidateIf((o: CreateCourseInput) => "description" in o && !!o.description)
  @MaxLength(200)
  description?: string

  @Field(() => Number)
  @IsNumber()
  numOfChapters: number

  @Field(() => Boolean)
  @IsBoolean()
  includeVideo: boolean

  @Field(() => String)
  @IsIn(["beginner", "intermediate", "advanced"])
  difficultyLevel: "beginner" | "intermediate" | "advanced"

  @Field(() => String)
  @IsString()
  category: string

  @Field(() => String)
  @Matches(/^\d+\s+hours\s+\d+\s+minutes$/, {
    message: "duration must be in format 'X hours Y minutes'",
  })
  duration: string

  @Field(() => [String])
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @IsString({ each: true })
  learningObjectives: string[]

  @Field(() => [String])
  @IsArray()
  @ArrayMaxSize(10)
  @IsString({ each: true })
  prerequisites: string[]

  @Field(() => [ChapterInput])
  @ValidateNested({ each: true })
  @Type(() => ChapterInput)
  chapters: ChapterInput[]

  @Field(() => String)
  @IsString()
  @MaxLength(7_000_000, { message: "bannerBase64 exceeds 5MB limit" })
  bannerBase64: string
}

@InputType()
class ChapterInput {
  @Field(() => String)
  @IsString()
  @MaxLength(50)
  name: string

  @Field(() => String, { nullable: true })
  @ValidateIf((o: ChapterInput) => !!o.description)
  @IsString()
  @MaxLength(150)
  description?: string

  @Field(() => String)
  @Matches(/^\d+\s+hours\s+\d+\s+minutes$/, {
    message: "duration must be in format 'X hours Y minutes'",
  })
  duration: string

  @Field(() => [TopicInput])
  @ValidateNested({ each: true })
  @Type(() => TopicInput)
  topics: TopicInput[]
}

@InputType()
class TopicInput {
  @Field(() => String)
  @IsString()
  @MaxLength(40)
  name: string

  @Field(() => String, { nullable: true })
  @ValidateIf((o: TopicInput) => !!o.description)
  @IsString()
  @MaxLength(100)
  description?: string

  @Field(() => String)
  @Matches(/^\d+\s+hours\s+\d+\s+minutes$/, {
    message: "duration must be in format 'X hours Y minutes'",
  })
  duration: string
}
