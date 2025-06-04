import AntSelect from "antd/es/select"
import type { SelectProps as AntSelectProps } from "antd/es/select"

import { ControlWrapperProps } from "@/shared/components/ControlWrapper"

export type SelectProps = Omit<AntSelectProps, "size" | "status"> & ControlWrapperProps & { status?: "success" | "error" }
export type SelectRef = React.ComponentRef<typeof AntSelect>
