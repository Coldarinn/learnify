import { StyledBadge, sizeStyles } from "./Badge.styles"
import { BadgeProps } from "./Badge.types"

export const Badge = (props: BadgeProps) => {
  const { size = "m", ...otherProps } = props

  const styles = sizeStyles[size]

  return <StyledBadge {...otherProps} css={styles} />
}
