import React from "react"

import { Form, FormItemProps } from "@/shared/components/Form"

import { TextArea } from "./TextArea"
import { TextAreaProps, TextAreaRef } from "./TextArea.types"

type Props<T> = {
  formItem?: FormItemProps<T>
  textArea?: TextAreaProps
}

const TextAreaComponent = React.forwardRef<TextAreaRef, TextAreaProps>((props, ref) => {
  const { status, errors } = Form.Item.useStatus()
  const isFormItem = status !== undefined
  const error = errors.join("; ")

  return <TextArea ref={ref} isFormItem={isFormItem} error={error} formControlStatus={status} {...props} />
})

export const FormTextArea = <T,>(props: Props<T>) => {
  return (
    <Form.Item<T> noStyle {...props.formItem}>
      <TextAreaComponent {...props.textArea} />
    </Form.Item>
  )
}
