import UserIcon from "@/shared/icons/user-rounded-bold.svg"

import { StyledAvatar } from "./Avatar.styles"
import { AvatarProps } from "./Avatar.types"

export const Avatar = (props: AvatarProps) => {
  return <StyledAvatar icon={!props.children && <UserIcon />} {...props} />
}
