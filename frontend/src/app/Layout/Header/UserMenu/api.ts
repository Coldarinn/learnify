import { userAtom } from "@/entities/user"
import { gqlClient } from "@/shared/api"
import { gql } from "@apollo/client"
import { action, wrap } from "@reatom/core"
import { withAsync } from "@reatom/core"

export const signOutAction = action(async () => {
  userAtom.reset()

  await wrap(
    gqlClient.mutate({
      mutation: gql`
        mutation signOut {
          signOut
        }
      `,
    })
  )
}).extend(withAsync())
