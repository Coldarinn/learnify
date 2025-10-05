import { User } from "@/entities/user"
import { gqlClient } from "@/shared/api"
import { gql } from "@apollo/client"
import { action, wrap } from "@reatom/core"
import { withAsync } from "@reatom/core"

import { ChangePasswordInput } from "./types"

export const changePasswordAction = action(async (data: Omit<ChangePasswordInput, "confirmPassword">) => {
  await wrap(
    gqlClient.mutate<{ updateProfile: User }>({
      mutation: gql`
        mutation changePassword($data: ChangePasswordInput!) {
          changePassword(data: $data)
        }
      `,
      variables: {
        data,
      },
    })
  )
}).extend(withAsync())
