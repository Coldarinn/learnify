import React from "react"

import { Form, FormItemProps } from "../Form"
import { Checkbox } from "./Checkbox"
import { CheckboxProps, CheckboxRef } from "./Checkbox.types"

type Props<T> = {
  formItem?: FormItemProps<T>
  checkbox?: CheckboxProps
}

const CheckboxComponent = React.forwardRef<CheckboxRef, CheckboxProps>((props, ref) => {
  const { status, errors } = Form.Item.useStatus()
  const error = errors.join("; ")

  return <Checkbox ref={ref} error={error} status={status as CheckboxProps["status"]} {...props} />
})

export const FormCheckbox = <T,>(props: Props<T>) => {
  return (
    <Form.Item<T> noStyle {...props.formItem}>
      <CheckboxComponent {...props.checkbox} />
    </Form.Item>
  )
}
