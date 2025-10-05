import { User } from "@/entities/user"
import { gqlClient } from "@/shared/api"
import { gql } from "@apollo/client"
import { action, wrap } from "@reatom/core"
import { withAsync } from "@reatom/core"

import { ChangeSessionInput } from "./types"

export const changeSessionAction = action(async (data: ChangeSessionInput) => {
  await wrap(
    gqlClient.mutate<{ updateProfile: User }>({
      mutation: gql`
        mutation requestSessionChange($data: ChangeSessionInput!) {
          requestSessionChange(data: $data)
        }
      `,
      variables: {
        data,
      },
    })
  )
}).extend(withAsync())
