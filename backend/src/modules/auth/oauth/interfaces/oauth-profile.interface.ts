import { OAuthProvider } from "prisma/generated"

export interface OAuthProfile {
  id: string
  provider: OAuthProvider
  email: string
  firstName?: string
  lastName?: string
  avatar?: string
}
