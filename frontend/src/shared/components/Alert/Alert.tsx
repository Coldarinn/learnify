import { Button } from "@/shared/components/Button"
import CloseIcon from "@/shared/icons/close.svg"

import { StyledAlert } from "./Alert.styles"
import { AlertProps } from "./Alert.types"

export const Alert = (props: AlertProps) => {
  return <StyledAlert closeIcon={<Button type="extra-secondary" size="xs" icon={<CloseIcon />} />} {...props} />
}
