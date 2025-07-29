import { Field, InputType } from "@nestjs/graphql"
import { IsString } from "class-validator"

@InputType()
export class SignInInput {
  @Field(() => String)
  @IsString()
  login: string

  @Field(() => String)
  password: string

  @Field({ nullable: true })
  twoFaCode?: string
}
