import { gqlClient } from "@/shared/api"
import { gql } from "@apollo/client"
import { action, wrap } from "@reatom/core"
import { withAsync } from "@reatom/core"

import { UpdateProfileInput } from "../types"

export const updateAvatarAction = action(async (avatar: FormData) => {
  console.log("avatar: ", avatar)
  await wrap(
    gqlClient.mutate({
      mutation: gql`
        mutation uploadUserAvatar($avatar: Upload!) {
          uploadUserAvatar(avatar: $avatar)
        }
      `,
      variables: {
        avatar,
      },
    })
  )
}).extend(withAsync())

export const updateProfileAction = action(async (data: UpdateProfileInput) => {
  await wrap(
    gqlClient.mutate({
      mutation: gql`
        mutation updateProfile($data: UpdateProfileInput!) {
          updateProfile(data: $data)
        }
      `,
      variables: {
        data,
      },
    })
  )
}).extend(withAsync())
