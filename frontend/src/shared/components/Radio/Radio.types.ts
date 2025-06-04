import { Group } from "antd/es/radio"
import type { RadioProps as AntRadioProps } from "antd/es/radio"
export type { RadioRef, RadioGroupProps } from "antd/es/radio"

export type RadioProps = Omit<AntRadioProps, "size"> & {
  size?: "s" | "m"
  extraContent?: React.ReactNode
  caption?: React.ReactNode
  status?: "success" | "error"
  error?: string
}
export type RadioGroupRef = React.ComponentRef<typeof Group>
