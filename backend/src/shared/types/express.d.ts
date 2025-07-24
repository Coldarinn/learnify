import { Request } from "express"

import { UserModel } from "@/modules/user/models/user.model"

declare module "express" {
  interface Request {
    user: UserModel
  }
}
