import { Field, InputType } from "@nestjs/graphql"
import { IsEmail } from "class-validator"

import { SessionMetadataModel } from "@/modules/session/models/session.model"

@InputType()
export class PasswordResetInput {
  @Field(() => String)
  @IsEmail()
  to: string

  @Field(() => String)
  username: string

  @Field(() => String)
  token: string

  @Field(() => SessionMetadataModel)
  metadata: SessionMetadataModel
}
