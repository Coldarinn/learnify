import { gqlClient } from "@/shared/api"
import { gql } from "@apollo/client"
import { computed, wrap } from "@reatom/core"
import { withAsyncData } from "@reatom/core"

import { Session } from "./types"

export const currentSessionResource = computed(async () => {
  const response = await wrap(
    gqlClient.query<{ currentSession: Session }>({
      query: gql`
        query currentSession {
          currentSession ${sessionFields}
        }
      `,
    })
  )

  if (!response.data?.currentSession) return {}

  return response.data?.currentSession
}).extend(withAsyncData({ initState: {} }))

export const sessionsResource = computed(async () => {
  const response = await wrap(
    gqlClient.query<{ userSessions: Session[] }>({
      query: gql`
        query userSessions {
          userSessions ${sessionFields}
        }
      `,
    })
  )

  if (!response.data?.userSessions?.length) return []

  return response.data?.userSessions
}).extend(withAsyncData({ initState: [] }))

const sessionFields = `{
  id
  userId
  isPrimary
  createdAt
  metadata {
    location {
      country
      city
      latitude
      longitude
    }
    device {
      browser
      os
      type
    }
    ip
  }
}`
