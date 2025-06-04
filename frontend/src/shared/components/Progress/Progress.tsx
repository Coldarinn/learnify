import { StyledProgress } from "./Progress.styles"
import { ProgressProps } from "./Progress.types"

export const Progress = (props: ProgressProps) => {
  const { color = "default", ...otherProps } = props

  const strokeColor = {
    default: "var(--color-surface-elements-accent)",
    red: "var(--color-surface-elements-critical)",
    green: "var(--color-surface-elements-success)",
    yellow: "var(--color-surface-elements-warning)",
  }[color]

  return <StyledProgress strokeColor={strokeColor} {...otherProps} />
}
