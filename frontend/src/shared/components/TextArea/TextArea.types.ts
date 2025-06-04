import type { TextAreaProps as AntTextAreaProps } from "antd/es/input"
export type { TextAreaRef } from "antd/es/input/TextArea"

import { ControlWrapperProps } from "@/shared/components/ControlWrapper"

export type TextAreaProps = Omit<AntTextAreaProps, "size" | "status"> &
  ControlWrapperProps & {
    status?: "success" | "error"
  }
