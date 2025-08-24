import { gqlClient } from "@/shared/api"
import { gql } from "@apollo/client"
import { action, wrap } from "@reatom/core"
import { withAsync } from "@reatom/core"

import { OAuthSignInInput, SignUpInput } from "./types"

export const signUpAction = action(async (data: SignUpInput) => {
  return await wrap(
    gqlClient.mutate({
      mutation: gql`
        mutation SignUp($data: SignUpInput!) {
          signUp(data: $data)
        }
      `,
      variables: {
        data,
      },
    })
  )
}).extend(withAsync())

export const signUpOAuthAction = action(async (data: OAuthSignInInput) => {
  return await wrap(
    gqlClient.mutate({
      mutation: gql`
        mutation signInOAuth($data: OAuthSignInInput!) {
          signInOAuth(data: $data)
        }
      `,
      variables: {
        data,
      },
    })
  )
}).extend(withAsync())
