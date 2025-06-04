import React from "react"

import { Form, FormItemProps } from "@/shared/components/Form"

import { Input } from "./Input"
import { InputProps, InputRef } from "./Input.types"

type Props<T> = {
  formItem?: FormItemProps<T>
  input?: InputProps
}

const InputComponent = React.forwardRef<InputRef, InputProps>((props, ref) => {
  const { status, errors } = Form.Item.useStatus()
  const isFormItem = status !== undefined
  const error = errors.join("; ")

  return <Input ref={ref} isFormItem={isFormItem} error={error} formControlStatus={status} {...props} />
})

export const FormInput = <T,>(props: Props<T>) => {
  return (
    <Form.Item<T> noStyle {...props.formItem}>
      <InputComponent {...props.input} isRequired={props.formItem?.required} />
    </Form.Item>
  )
}
