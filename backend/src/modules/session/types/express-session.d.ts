import "express-session"

import { SessionMetadata } from "./session-metadata.types"

declare module "express-session" {
  interface SessionData {
    id: string
    userId: string
    isPrimary: boolean
    createdAt: Date | string
    metadata: SessionMetadata
  }
}
