import React from "react"

import { Form, FormItemProps } from "@/shared/components/Form"

import { Dragger } from "./Dragger"
import { DraggerProps } from "./Dragger.types"
import { UploadRef } from "../Upload.types"

type Props<T> = React.PropsWithChildren<{
  formItem?: FormItemProps<T>
  dragger?: DraggerProps
}>

const DraggerComponent = React.forwardRef<UploadRef, DraggerProps>((props, ref) => <Dragger ref={ref} {...props} />)

export const FormDragger = <T,>(props: Props<T>) => {
  const { formItem, dragger, children } = props

  return (
    <Form.Item<T> noStyle {...formItem}>
      <DraggerComponent {...dragger}>{children}</DraggerComponent>
    </Form.Item>
  )
}
