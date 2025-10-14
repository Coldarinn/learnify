import type { BadgeProps as AntBadgeProps } from "antd"

export type BadgeProps = Omit<AntBadgeProps, "size" | "color"> & {
  size?: "s" | "m" | "l"
  bright?: boolean
  color?: (typeof colors)[number]
  customColors?: {
    text?: string
    background?: string
    border?: string
  }
}

export const colors = ["success", "info", "warning", "accent", "error", "grape", "dark-blue", "turquoise"] as const
