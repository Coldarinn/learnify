import { gqlClient } from "@/shared/api"
import { gql } from "@apollo/client"
import { action, wrap } from "@reatom/core"
import { withAsync } from "@reatom/core"

import { userAtom } from "./atom"
import { User } from "./model"

export const getUserAction = action(async () => {
  const response = await wrap(
    gqlClient.query<{ me: User }>({
      query: gql`
        query me {
          me {
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
    })
  )

  if (!response.data) return false
  userAtom.set(response.data.me)

  return true
}).extend(withAsync())
