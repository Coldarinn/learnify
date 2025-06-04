import React from "react"

import { Form, FormItemProps } from "@/shared/components/Form"

import { Cascader } from "./Cascader"
import { CascaderProps, CascaderRef } from "./Cascader.types"

type Props<T> = {
  formItem?: FormItemProps<T>
  cascader?: CascaderProps
}

const CascaderComponent = React.forwardRef<CascaderRef, CascaderProps>((props, ref) => {
  const { status, errors } = Form.Item.useStatus()
  const isFormItem = status !== undefined
  const error = errors.join("; ")

  return <Cascader ref={ref} isFormItem={isFormItem} error={error} formControlStatus={status} {...props} />
})

export const FormCascader = <T,>(props: Props<T>) => {
  return (
    <Form.Item<T> noStyle {...props.formItem}>
      <CascaderComponent {...props.cascader} isRequired={props.formItem?.required} />
    </Form.Item>
  )
}
