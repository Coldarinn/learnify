import { User } from "@/entities/user"
import { gqlClient } from "@/shared/api"
import { gql } from "@apollo/client"
import { action, wrap } from "@reatom/core"
import { withAsync } from "@reatom/core"

import { ChangeEmailInput } from "./types"

export const changeEmailAction = action(async (data: ChangeEmailInput) => {
  await wrap(
    gqlClient.mutate<{ updateProfile: User }>({
      mutation: gql`
        mutation requestEmailChange($data: ChangeEmailInput!) {
          requestEmailChange(data: $data)
        }
      `,
      variables: {
        data,
      },
    })
  )
}).extend(withAsync())
