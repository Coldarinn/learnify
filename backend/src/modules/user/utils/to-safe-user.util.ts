import { FullUserModel } from "../models/full-user.model"
import { UserModel } from "../models/user.model"

export function toSafeUser(user: FullUserModel): UserModel {
  const { password: _p, oAuthAccounts: _o, twoFaSecret: _tw, tempTwoFaSecret: _te, tokens: _to, ...safeUser } = user
  return safeUser
}
