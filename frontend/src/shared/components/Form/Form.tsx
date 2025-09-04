import AntForm from "antd/es/form"
import { ComponentProps } from "react"

import { FormStyles } from "./Form.styles"

export const Form = ((props: ComponentProps<typeof AntForm>) => (
  <AntForm {...props} className={`${props.className} ${FormStyles}`} />
)) as typeof AntForm

Object.assign(Form, AntForm)
