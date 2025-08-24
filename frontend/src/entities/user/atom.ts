import { atom, effect, withInit } from "@reatom/core"

import { User } from "./model"

const persistKey = "learnify-user"

const initUser: User = {
  id: "",
  email: "",
  username: "",
  firstName: "",
  lastName: "",
  avatarUrl: null,
  avatarKey: null,
  isEmailConfirmed: false,
  isTwoFaEnabled: false,
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const userAtom = atom<User>(initUser).extend(withInit(() => JSON.parse(localStorage.getItem(persistKey) || JSON.stringify(initUser))))

effect(() => {
  const user = userAtom()
  const dataToSet = user.id ? user : initUser
  localStorage.setItem(persistKey, JSON.stringify(dataToSet))
})
