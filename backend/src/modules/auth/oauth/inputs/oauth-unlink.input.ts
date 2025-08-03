import { Field, InputType } from "@nestjs/graphql"
import { IsIn, IsString } from "class-validator"

@InputType()
export class OAuthUnlinkInput {
  @Field()
  @IsString()
  @IsIn(["google", "yandex"])
  provider: "google" | "yandex"
}
