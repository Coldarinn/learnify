import React from "react"

import { Form, FormItemProps } from "@/shared/components/Form"

import { InputNumber } from "./InputNumber"
import { InputNumberProps, InputNumberRef } from "./InputNumber.types"

type Props<T> = {
  formItem?: FormItemProps<T>
  input?: InputNumberProps
}

const InputNumberComponent = React.forwardRef<InputNumberRef, InputNumberProps>((props, ref) => {
  const { status, errors } = Form.Item.useStatus()
  const isFormItem = status !== undefined
  const error = errors.join("; ")

  return <InputNumber ref={ref} isFormItem={isFormItem} error={error} formControlStatus={status} {...props} />
})

export const FormInputNumber = <T,>(props: Props<T>) => {
  return (
    <Form.Item<T> noStyle {...props.formItem}>
      <InputNumberComponent {...props.input} isRequired={props.formItem?.required} />
    </Form.Item>
  )
}
