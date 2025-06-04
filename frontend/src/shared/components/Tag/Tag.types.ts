import type { TagProps as AntTagProps } from "antd/es/tag"

export type TagProps = Omit<AntTagProps, "size"> & {
  size?: "xs" | "s" | "m" | "l"
}
