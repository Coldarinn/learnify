import { Cascader } from "@/shared/components/Cascader"

import { DropdownStyles, sizeStyles } from "./Dropdown.styles"
import { DropdownProps } from "./Dropdown.types"

export const Dropdown = (props: DropdownProps) => {
  const { rootClassName = "", size = "m", ...otherProps } = props

  return <Cascader rootClassName={`${DropdownStyles} ${sizeStyles(size)} ${rootClassName}`} size={size} {...otherProps} />
}
