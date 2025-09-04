import { Field, InputType } from "@nestjs/graphql"
import { IsEmail } from "class-validator"

@InputType()
export class ChangeEmailInput {
  @Field(() => String)
  currentPassword: string

  @Field(() => String)
  @IsEmail()
  newEmail: string
}
