import { sizeStyles, StyledTag } from "./Tag.styles"
import { TagProps } from "./Tag.types"

export const Tag = (props: TagProps) => {
  const { size = "m", ...otherProps } = props

  const styles = sizeStyles[size]

  return <StyledTag {...otherProps} css={styles} />
}
