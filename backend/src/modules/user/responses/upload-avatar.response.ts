import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class UploadAvatarResponse {
  @Field()
  avatarKey: string

  @Field()
  avatarUrl: string
}
