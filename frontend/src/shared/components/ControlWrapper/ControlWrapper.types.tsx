import { FormItemProps } from "@/shared/components/Form"

export type ControlWrapperProps = React.PropsWithChildren<{
  isFormItem?: boolean
  isRequired?: boolean
  error?: string
  label?: React.ReactNode
  caption?: React.ReactNode
  size?: "s" | "m" | "l"
  formControlStatus?: FormItemProps["status"]
  className?: string
}>
