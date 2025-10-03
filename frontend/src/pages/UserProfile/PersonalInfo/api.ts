import { User } from "@/entities/user"
import { gqlClient } from "@/shared/api"
import { gql } from "@apollo/client"
import { action, wrap } from "@reatom/core"
import { withAsync } from "@reatom/core"
import { UploadFile } from "antd/es/upload"

import { UpdateProfileInput } from "./types"

export const updateAvatarAction = action(async (file: UploadFile) => {
  if (!(file instanceof File)) throw new Error("Invalid file")

  const formData = new FormData()
  formData.append(
    "operations",
    JSON.stringify({
      query: `
        mutation uploadUserAvatar($avatar: Upload!) {
          uploadUserAvatar(avatar: $avatar) {
            avatarKey
            avatarUrl
          }
        }
      `,
      variables: { avatar: null },
    })
  )
  formData.append(
    "map",
    JSON.stringify({
      "0": ["variables.avatar"],
    })
  )
  formData.append("0", file)

  await wrap(
    fetch(`${import.meta.env.VITE_SERVER_URL}/graphql`, {
      method: "POST",
      body: formData,
      credentials: "include",
      headers: {
        "x-apollo-operation-name": "uploadUserAvatar",
      },
    })
  )
}).extend(withAsync())

export const updateProfileAction = action(async (data: UpdateProfileInput) => {
  await wrap(
    gqlClient.mutate<{ updateProfile: User }>({
      mutation: gql`
        mutation updateProfile($data: UpdateProfileInput!) {
          updateProfile(data: $data) {
            username
            firstName
            lastName
          }
        }
      `,
      variables: {
        data,
      },
    })
  )
}).extend(withAsync())
