import React from "react"

import { Form, FormItemProps } from "@/shared/components/Form"

import { Radio } from "./Radio"
import { RadioGroupProps, RadioGroupRef, RadioProps, RadioRef } from "./Radio.types"

type Props<T> = React.PropsWithChildren<{
  formItem?: FormItemProps<T>
  radio?: RadioProps
}>

const RadioComponent = React.forwardRef<RadioRef, RadioProps>((props, ref) => {
  const { children } = props

  const { status, errors } = Form.Item.useStatus()
  const error = errors.join("; ")

  return (
    <Radio ref={ref} error={error} status={status as RadioProps["status"]} {...props}>
      {children}
    </Radio>
  )
})

export const FormRadio = <T,>(props: Props<T>) => {
  return (
    <Form.Item<T> noStyle {...props.formItem}>
      <RadioComponent {...props.radio} />
    </Form.Item>
  )
}

const RadioGroupComponent = React.forwardRef<RadioGroupRef, RadioGroupProps>((props, ref) => {
  return <Radio.Group ref={ref} {...props} />
})

type GroupProps<T> = React.PropsWithChildren<{
  formItem?: FormItemProps<T>
  radioGroup?: RadioGroupProps
}>

const FormRadioGroup = <T,>(props: GroupProps<T>) => {
  const { children } = props

  return (
    <Form.Item<T> noStyle {...props.formItem}>
      <RadioGroupComponent {...props.radioGroup}>{children}</RadioGroupComponent>
    </Form.Item>
  )
}

FormRadio.Group = FormRadioGroup
