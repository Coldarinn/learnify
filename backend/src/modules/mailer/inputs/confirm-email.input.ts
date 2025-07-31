import { Field, InputType } from "@nestjs/graphql"
import { IsEmail } from "class-validator"

@InputType()
export class ConfirmEmailInput {
  @Field(() => String)
  @IsEmail()
  to: string

  @Field(() => String)
  firstName: string

  @Field(() => String)
  lastName: string

  @Field(() => String)
  token: string
}
