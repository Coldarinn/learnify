import React from "react"

import { Select } from "./Select"
import { SelectProps, SelectRef } from "./Select.types"
import { Form, FormItemProps } from "../Form"

type Props<T> = {
  formItem?: FormItemProps<T>
  select?: SelectProps
}

const SelectComponent = React.forwardRef<SelectRef, SelectProps>((props, ref) => {
  const { status, errors } = Form.Item.useStatus()
  const isFormItem = status !== undefined
  const error = errors.join("; ")

  return <Select ref={ref} isFormItem={isFormItem} error={error} formControlStatus={status} {...props} />
})

export const FormSelect = <T,>(props: Props<T>) => {
  return (
    <Form.Item<T> noStyle {...props.formItem}>
      <SelectComponent {...props.select} isRequired={props.formItem?.required} />
    </Form.Item>
  )
}
