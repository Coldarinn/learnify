import { User } from "@/entities/user"
import { gqlClient } from "@/shared/api"
import { gql } from "@apollo/client"
import { action, wrap } from "@reatom/core"
import { withAsync } from "@reatom/core"

import { RequestPasswordResetInput } from "./types"

export const requestPasswordResetAction = action(async (data: RequestPasswordResetInput) => {
  return await wrap(
    gqlClient.mutate<{ signIn: User }>({
      mutation: gql`
        mutation requestPasswordReset($data: RequestPasswordResetInput!) {
          requestPasswordReset(data: $data)
        }
      `,
      variables: {
        data,
      },
    })
  )
}).extend(withAsync())
