import type { InputProps as AntInputProps } from "antd/es/input"

import { ControlWrapperProps } from "@/shared/components/ControlWrapper"

export type { InputRef } from "antd/es/input"

export type InputProps = Omit<AntInputProps, "size" | "status"> &
  ControlWrapperProps & {
    status?: "success" | "error"
  }
