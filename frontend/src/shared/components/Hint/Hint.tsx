import Popover from "antd/es/popover"

import { StyledHint } from "./Hint.styles"
import { HintProps } from "./Hint.types"

export const Hint = (props: HintProps) => {
  const { rootClassName = "", ...otherProps } = props

  return <Popover rootClassName={`${StyledHint} ${rootClassName}`} {...otherProps} />
}
