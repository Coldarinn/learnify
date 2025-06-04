import type { InputNumberProps as AntInputNumberProps } from "antd/es/input-number"
import InputNumber from "antd/es/input-number"

import { ControlWrapperProps } from "@/shared/components/ControlWrapper"

export type InputNumberProps = Omit<AntInputNumberProps, "size" | "status"> &
  ControlWrapperProps & {
    status?: "success" | "error"
  }

export type InputNumberRef = React.ComponentRef<typeof InputNumber>
