import React from "react"

import { Form, FormItemProps } from "@/shared/components/Form"

import { DatePicker } from "./DatePicker"
import { RangePickerProps, RangePickerRef } from "./DatePicker.types"

type Props<T> = {
  formItem?: FormItemProps<T>
  rangePicker?: RangePickerProps
}

const RangePickerComponent = React.forwardRef<RangePickerRef, RangePickerProps>((props, ref) => {
  const { status, errors } = Form.Item.useStatus()
  const isFormItem = status !== undefined
  const error = errors.join("; ")

  return <DatePicker.RangePicker ref={ref} isFormItem={isFormItem} error={error} formControlStatus={status} {...props} />
})

export const FormRangePicker = <T,>(props: Props<T>) => {
  return (
    <Form.Item<T> noStyle {...props.formItem}>
      <RangePickerComponent {...props.rangePicker} isRequired={props.formItem?.required} />
    </Form.Item>
  )
}
