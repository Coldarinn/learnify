import { Field, InputType } from "@nestjs/graphql"
import { TokenType } from "prisma/generated"

@InputType()
class GenerateTokenOptionsInput {
  @Field(() => Boolean, { nullable: true })
  isUUID?: boolean

  @Field(() => Number, { nullable: true })
  expiresInMs?: number

  @Field(() => Number, { nullable: true })
  tokenLength?: number
}

@InputType()
export class GenerateTokenInput {
  @Field(() => String)
  userId: string

  @Field(() => TokenType)
  type: TokenType

  @Field(() => GenerateTokenOptionsInput, { nullable: true })
  options?: GenerateTokenOptionsInput
}
