import type { TextAreaProps as AntTextAreaProps } from "antd/es/input"

import { ControlWrapperProps } from "@/shared/components/ControlWrapper"

export type { TextAreaRef } from "antd/es/input/TextArea"

export type TextAreaProps = Omit<AntTextAreaProps, "size" | "status"> &
  ControlWrapperProps & {
    status?: "success" | "error"
  }
