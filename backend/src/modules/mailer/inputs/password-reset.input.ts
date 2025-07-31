import { Field, InputType } from "@nestjs/graphql"
import { IsEmail } from "class-validator"

import { SessionMetadataModel } from "@/modules/session/models/session.model"

@InputType()
export class PasswordResetInput {
  @Field(() => String)
  @IsEmail()
  to: string

  @Field(() => String)
  firstName: string

  @Field(() => String)
  lastName: string

  @Field(() => String)
  token: string

  @Field(() => SessionMetadataModel)
  metadata: SessionMetadataModel
}
