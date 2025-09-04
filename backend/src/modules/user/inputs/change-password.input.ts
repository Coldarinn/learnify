import { Field, InputType } from "@nestjs/graphql"
import { MinLength } from "class-validator"

@InputType()
export class ChangePasswordInput {
  @Field(() => String)
  currentPassword: string

  @Field(() => String)
  @MinLength(6)
  newPassword: string
}
