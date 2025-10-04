import { gqlClient } from "@/shared/api"
import { gql } from "@apollo/client"
import { action, wrap } from "@reatom/core"
import { withAsync } from "@reatom/core"

import { ConfirmEmailChangeInput } from "./types"

export const confirmEmailAction = action(async (data: ConfirmEmailChangeInput) => {
  try {
    return await wrap(
      gqlClient.mutate({
        mutation: gql`
          mutation confirmEmailChange($data: ConfirmEmailChangeInput!) {
            confirmEmailChange(data: $data)
          }
        `,
        variables: {
          data,
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
