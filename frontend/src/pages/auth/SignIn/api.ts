import { User, userAtom } from "@/entities/user"
import { gqlClient } from "@/shared/api"
import { gql } from "@apollo/client"
import { action, wrap } from "@reatom/core"
import { withAsync } from "@reatom/core"

import { SignInInput } from "./types"

export const signInAction = action(async (data: SignInInput) => {
  const response = await wrap(
    gqlClient.mutate<{ signIn: User }>({
      mutation: gql`
        mutation signIn($data: SignInInput!) {
          signIn(data: $data) {
            id
            email
            username
            firstName
            lastName
            avatarUrl
            avatarKey
            isEmailConfirmed
            isTwoFaEnabled
            createdAt
            updatedAt
          }
        }
      `,
      variables: {
        data,
      },
    })
  )

  if (!response.data) return false
  userAtom.set(response.data.signIn)

  return true
}).extend(withAsync())

export const confirmEmailAction = action(async (token: string) => {
  await wrap(
    gqlClient.mutate({
      mutation: gql`
        mutation confirmEmail($token: String!) {
          confirmEmail(token: $token)
        }
      `,
      variables: {
        token,
      },
    })
  )
}).extend(withAsync())

export const resendConfirmEmailAction = action(async (oldToken: string) => {
  console.log("oldToken: ", oldToken)

  await wrap(
    gqlClient.mutate({
      mutation: gql`
        mutation reSendConfirmEmail($oldToken: String!) {
          reSendConfirmEmail(oldToken: $oldToken)
        }
      `,
      variables: {
        oldToken,
      },
    })
  )
}).extend(withAsync())
