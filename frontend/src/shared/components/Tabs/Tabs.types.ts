import type { TabsProps as AntTabsProps } from "antd/es/tabs"

export type TabsProps = Omit<AntTabsProps, "size" | "type"> & {
  type?: "line" | "square" | "square-orange" | "square-accent"
  size?: "s" | "m" | "l"
}
