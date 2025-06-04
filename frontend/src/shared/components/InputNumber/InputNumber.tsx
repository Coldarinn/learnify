import React from "react"

import { sizeStyles, StyledInputNumber, Wrapper } from "./InputNumber.styles"
import { InputNumberProps, InputNumberRef } from "./InputNumber.types"

export const InputNumber = React.forwardRef<InputNumberRef, InputNumberProps>((props, ref) => {
  const {
    className,
    size = "m",
    label,
    caption,
    status,
    formControlStatus,
    isFormItem,
    isRequired,
    error,
    ...otherProps
  } = props

  const styles = sizeStyles[size]

  return (
    <Wrapper
      className={className}
      size={size}
      label={label}
      caption={caption}
      formControlStatus={formControlStatus || status}
      isFormItem={isFormItem}
      isRequired={isRequired}
      error={error}
    >
      <StyledInputNumber ref={ref} className="custom-input-number" {...otherProps} css={styles} />
    </Wrapper>
  )
})
