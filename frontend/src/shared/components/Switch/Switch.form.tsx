import React from "react"

import { Form, FormItemProps } from "@/shared/components/Form"

import { Switch } from "./Switch"
import { SwitchProps, SwitchRef } from "./Switch.types"

type Props<T> = {
  formItem?: FormItemProps<T>
  switch?: SwitchProps
}

const SwitchComponent = React.forwardRef<SwitchRef, SwitchProps>((props, ref) => {
  const { status, errors } = Form.Item.useStatus()
  const error = errors.join("; ")

  return <Switch ref={ref} error={error} status={status as SwitchProps["status"]} {...props} />
})

export const FormSwitch = <T,>(props: Props<T>) => {
  return (
    <Form.Item<T> noStyle {...props.formItem}>
      <SwitchComponent {...props.switch} />
    </Form.Item>
  )
}
