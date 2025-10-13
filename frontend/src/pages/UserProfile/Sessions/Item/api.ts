import { gqlClient } from "@/shared/api"
import { gql } from "@apollo/client"
import { action, wrap } from "@reatom/core"
import { withAsync } from "@reatom/core"

export const terminateSessionAction = action(async (sessionId: string) => {
  return await wrap(
    gqlClient.mutate({
      mutation: gql`
        mutation terminateSession($sessionId: String!) {
          terminateSession(sessionId: $sessionId)
        }
      `,
      variables: {
        sessionId,
      },
    })
  )
}).extend(withAsync())
