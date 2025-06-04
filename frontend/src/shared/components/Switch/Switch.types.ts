import Switch from "antd/es/switch"
import type { SwitchProps as AntSwitchProps } from "antd/es/switch"
import React from "react"

export type SwitchProps = React.PropsWithChildren<Omit<AntSwitchProps, "size">> & {
  size?: "s" | "m"
  extraContent?: React.ReactNode
  caption?: React.ReactNode
  status?: "success" | "error"
  error?: string
}

export type SwitchRef = React.ComponentRef<typeof Switch>
