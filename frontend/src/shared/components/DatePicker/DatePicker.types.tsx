import type { DatePickerProps as AntDatePickerProps, RangePickerProps as AntRangePickerProps } from "antd/es/date-picker"
import AntDatePicker from "antd/es/date-picker"

import { ControlWrapperProps } from "@/shared/components/ControlWrapper"

export type DatePickerProps = Omit<AntDatePickerProps, "status" | "size"> & ControlWrapperProps & { status?: "success" | "error" }
export type RangePickerProps = Omit<AntRangePickerProps, "status" | "size"> & ControlWrapperProps & { status?: "success" | "error" }
export type DatePickerRef = React.ComponentRef<typeof AntDatePicker>
export type RangePickerRef = React.ComponentRef<typeof AntDatePicker.RangePicker>
export type DatePickerBaseProps = {
  component: typeof AntDatePicker | typeof AntDatePicker.RangePicker
} & (DatePickerProps | RangePickerProps)
