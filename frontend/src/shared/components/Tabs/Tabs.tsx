import { css } from "@emotion/react"

import { StyledTabs, sizeStyles, typeStyles } from "./Tabs.styles"
import { TabsProps } from "./Tabs.types"

export const Tabs = (props: TabsProps) => {
  const { size = "m", type = "line", ...otherProps } = props

  const styles = css(sizeStyles[size], typeStyles[type])

  return <StyledTabs {...otherProps} customType={type} css={styles} />
}
