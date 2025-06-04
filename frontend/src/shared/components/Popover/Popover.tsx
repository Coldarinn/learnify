import AntPopover from "antd/es/popover"

import { StyledPopover } from "./Popover.styles"
import { PopoverProps } from "./Popover.types"

export const Popover = (props: PopoverProps) => {
  const { classNames, ...otherProps } = props

  return (
    <AntPopover
      classNames={{ ...classNames, root: `${StyledPopover} ${classNames?.root || ""}` }}
      trigger="click"
      arrow={false}
      placement="bottomLeft"
      {...otherProps}
    />
  )
}
