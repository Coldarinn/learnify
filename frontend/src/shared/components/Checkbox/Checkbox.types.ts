import type { CheckboxProps as AntCheckboxProps } from "antd/es/checkbox"
export type { CheckboxRef } from "antd/es/checkbox"
import React from "react"

export type CheckboxProps = React.PropsWithChildren<AntCheckboxProps> & {
  size?: "s" | "m"
  extraContent?: React.ReactNode
  caption?: React.ReactNode
  status?: "success" | "error"
  error?: string
}
