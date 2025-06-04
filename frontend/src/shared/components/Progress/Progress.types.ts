import type { ProgressProps as AntProgressProps } from "antd/es/progress"

export type ProgressProps = AntProgressProps & {
  color?: "default" | "red" | "green" | "yellow"
}
