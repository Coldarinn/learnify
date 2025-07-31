import { Field, InputType } from "@nestjs/graphql"
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator"

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsEmail()
  email: string

  @Field(() => String)
  @Matches(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/)
  username: string

  @Field(() => String)
  @MinLength(6)
  password: string

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  firstName: string

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  lastName: string
}
