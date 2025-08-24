import { User, userAtom } from "@/entities/user"
import { gqlClient } from "@/shared/api"
import { gql } from "@apollo/client"
import { action, wrap } from "@reatom/core"
import { withAsync } from "@reatom/core"

import { OAuthSignInInput } from "./types"

export const signInOAuthAction = action(async (data: OAuthSignInInput) => {
  const response = await wrap(
    gqlClient.mutate<{ signInOAuth: User }>({
      mutation: gql`
        mutation signInOAuth($data: OAuthSignInInput!) {
          signInOAuth(data: $data) {
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
  userAtom.set(response.data.signInOAuth)

  return true
}).extend(withAsync())
