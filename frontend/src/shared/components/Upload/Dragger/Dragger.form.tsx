import React from "react"

import { Form, FormItemProps } from "@/shared/components/Form"

import { UploadRef } from "../Upload.types"
import { Dragger } from "./Dragger"
import { DraggerProps } from "./Dragger.types"

type Props<T> = React.PropsWithChildren<{
  formItem?: FormItemProps<T>
  dragger?: DraggerProps
}>

export const FormDragger = React.forwardRef(<T,>(props: Props<T>, ref: React.Ref<UploadRef>) => {
  const { formItem, dragger, children } = props

  return (
    <Form.Item<T> noStyle {...formItem}>
      <Dragger ref={ref} {...dragger}>
        {children}
      </Dragger>
    </Form.Item>
  )
}) as <T>(props: Props<T> & { ref?: React.Ref<UploadRef> }) => React.ReactElement
