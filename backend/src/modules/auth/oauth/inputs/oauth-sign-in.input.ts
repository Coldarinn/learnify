import { Field, InputType } from "@nestjs/graphql"
import { IsIn, IsNotEmpty, IsString } from "class-validator"

@InputType()
export class OAuthSignInInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  code: string

  @Field()
  @IsString()
  @IsIn(["google", "yandex"])
  provider: "google" | "yandex"
}
