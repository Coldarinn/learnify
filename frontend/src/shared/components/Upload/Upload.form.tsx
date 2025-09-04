import React from "react"

import { Form, FormItemProps } from "@/shared/components/Form"

import { FormDragger } from "./Dragger"
import { Upload } from "./Upload"
import { UploadProps, UploadRef } from "./Upload.types"

type Props<T> = React.PropsWithChildren<{
  formItem?: FormItemProps<T>
  upload?: UploadProps
}>

const UploadComponent = React.forwardRef<UploadRef, UploadProps>((props, ref) => <Upload ref={ref} {...props} />)

const FormUploadComponent = <T,>(props: Props<T>) => {
  const { formItem, upload, children } = props

  return (
    <Form.Item<T> noStyle {...formItem}>
      <UploadComponent {...upload}>{children}</UploadComponent>
    </Form.Item>
  )
}

export const FormUpload = Object.assign(FormUploadComponent, {
  Dragger: FormDragger,
})
