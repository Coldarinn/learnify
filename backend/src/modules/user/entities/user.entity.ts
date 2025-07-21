import { Field, ID, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class User {
  @Field(() => ID)
  id: string

  @Field(() => String)
  email: string

  @Field(() => String)
  password: string

  @Field(() => String)
  username: string

  @Field(() => String, { nullable: true })
  avatar: string

  @Field(() => String)
  createdAt: string

  @Field(() => String)
  updatedAt: string
}
