import { Field, InputType } from "@nestjs/graphql"
import { IsEmail } from "class-validator"

@InputType()
export class ConfirmEmailInput {
  @Field(() => String)
  @IsEmail()
  to: string

  @Field(() => String)
  username: string

  @Field(() => String)
  token: string
}
