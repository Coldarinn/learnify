import { OAuthProvider } from "prisma/generated"

export interface OAuthProfile {
  id: string
  provider: OAuthProvider
  email: string
  firstName?: string
  lastName?: string
  avatar?: string
}

export interface GoogleProfileResponse {
  sub: string
  email: string
  given_name: string
  family_name: string
  picture: string
}

export interface OAuthTokenResponse {
  token_type: string
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
}

export interface YandexProfileResponse {
  id: string
  default_email: string
  first_name: string
  last_name: string
  default_avatar_id?: string
}
