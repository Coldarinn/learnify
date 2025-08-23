import React from "react"

import { StyledInput, Wrapper, sizeStyles } from "./Input.styles"
import { InputProps, InputRef } from "./Input.types"

export const Input = React.forwardRef<InputRef, InputProps>((props, ref) => {
  const { className, size = "m", label, caption, status, formControlStatus, isFormItem, isRequired, error, ...otherProps } = props

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
      <StyledInput itemRef="input" ref={ref} className="custom-input" {...otherProps} css={styles} />
    </Wrapper>
  )
})
