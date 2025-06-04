import React from "react"

import { Form, FormItemProps } from "@/shared/components/Form"

import { DatePicker } from "./DatePicker"
import { DatePickerProps, DatePickerRef } from "./DatePicker.types"
import { FormRangePicker } from "./RangePicker.form"

type Props<T> = {
  formItem?: FormItemProps<T>
  datePicker?: DatePickerProps
}

const DatePickerComponent = React.forwardRef<DatePickerRef, DatePickerProps>((props, ref) => {
  const { status, errors } = Form.Item.useStatus()
  const isFormItem = status !== undefined
  const error = errors.join("; ")

  return <DatePicker ref={ref} isFormItem={isFormItem} error={error} formControlStatus={status} {...props} />
})

export const FormDatePickerMain = <T,>(props: Props<T>) => {
  return (
    <Form.Item<T> noStyle {...props.formItem}>
      <DatePickerComponent {...props.datePicker} isRequired={props.formItem?.required} />
    </Form.Item>
  )
}

export const FormDatePicker = Object.assign(FormDatePickerMain, { RangePicker: FormRangePicker })
