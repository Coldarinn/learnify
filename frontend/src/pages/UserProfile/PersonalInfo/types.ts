import { UploadFile } from "antd/es/upload"

export type PersonalInfoType = {
  firstName: string
  lastName: string
  username: string
  avatar: UploadFile
}
