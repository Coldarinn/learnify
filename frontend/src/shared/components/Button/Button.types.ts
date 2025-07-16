import type { ButtonProps as AntButtonProps } from "antd/es/button"
import Button from "antd/es/button"

export type ButtonProps = Omit<AntButtonProps, "size" | "type"> & {
  size?: "xs" | "s" | "m" | "l" | "xl"
  type?: "main-primary" | "main-secondary" | "main-outline" | "link" | "extra-primary" | "extra-secondary" | "extra-outline"
}
export type ButtonRef = React.ComponentRef<typeof Button>
