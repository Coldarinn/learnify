export type User = {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  avatarUrl: string | null
  avatarKey: string | null
  isEmailConfirmed: boolean
  isTwoFaEnabled: boolean
  createdAt: Date
  updatedAt: Date
}
