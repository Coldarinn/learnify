export type SignUpInput = {
  email: string
  username: string
  firstName: string
  lastName: string
  password: string
}

export type OAuthSignInInput = {
  code: string
  provider: "google" | "yandex"
}
