import type { SpinProps as AntSpinProps } from "antd"

export type SpinProps = Omit<AntSpinProps, "size"> & {
  variant?: "circle" | "round"
  size?: "s" | "m" | "l"
  color?: string
}
