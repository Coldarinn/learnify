import { Field, ID, ObjectType } from "@nestjs/graphql"
import { User } from "prisma/generated"

@ObjectType()
export class UserModel implements Omit<User, "password" | "twoFaSecret" | "tempTwoFaSecret"> {
  @Field(() => ID)
  id: string

  @Field(() => String)
  email: string

  @Field(() => String)
  username: string

  @Field(() => String, { nullable: true })
  avatar: string | null

  @Field(() => Boolean)
  isEmailConfirmed: boolean

  @Field(() => Boolean)
  isTwoFaEnabled: boolean

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date
}
