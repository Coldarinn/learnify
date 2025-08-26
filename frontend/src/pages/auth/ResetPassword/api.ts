import { User } from "@/entities/user"
import { gqlClient } from "@/shared/api"
import { gql } from "@apollo/client"
import { action, wrap } from "@reatom/core"
import { withAsync } from "@reatom/core"

import { ResetPasswordInput } from "./types"

export const resetPasswordAction = action(async (data: ResetPasswordInput) => {
  try {
    return await wrap(
      gqlClient.mutate<{ signIn: User }>({
        mutation: gql`
          mutation resetPassword($data: ResetPasswordInput!) {
            resetPassword(data: $data)
          }
        `,
        variables: {
          data: {
            token: data.token,
            newPassword: data.newPassword,
          },
        },
      })
    )
  } catch (err) {
    let message = ""

    if (err instanceof Error && "errors" in err && Array.isArray(err.errors)) message = err.errors.map((err) => err.message).join("; ")

    if (err instanceof Error) message = err.message

    if (message.includes("expired")) message = "Invalid or expired link. Please request a new one"

    throw new Error(message)
  }
}).extend(withAsync())
