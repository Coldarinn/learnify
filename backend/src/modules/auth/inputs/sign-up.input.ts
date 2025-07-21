import { Field, InputType } from "@nestjs/graphql"
import { IsEmail, Matches, MinLength } from "class-validator"

@InputType()
export class SignUpInput {
  @Field(() => String)
  @IsEmail()
  email: string

  @Field(() => String)
  @Matches(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/)
  username: string

  @Field(() => String)
  @MinLength(6)
  password: string
}
