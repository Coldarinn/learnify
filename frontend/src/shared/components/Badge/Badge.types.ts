import type { BadgeProps as AntBadgeProps } from "antd/es/badge"

export type BadgeProps = Omit<AntBadgeProps, "size"> & {
  size?: "s" | "m" | "l"
  bright?: boolean
}
