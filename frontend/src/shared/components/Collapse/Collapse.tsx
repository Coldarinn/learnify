import ArrowIcon from "@/shared/icons/arrow-alt.svg"

import { StyledCollapse } from "./Collapse.styles"
import { CollapseProps } from "./Collapse.types"

export const Collapse = (props: CollapseProps) => {
  return <StyledCollapse expandIconPosition="end" expandIcon={() => <ArrowIcon />} {...props} />
}
