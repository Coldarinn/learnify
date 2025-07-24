import { Field, InputType } from "@nestjs/graphql"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

@InputType()
export class SendEmailInput {
  @Field(() => String)
  @IsEmail()
  to: string

  @Field(() => String)
  subject: string

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  html: string
}
