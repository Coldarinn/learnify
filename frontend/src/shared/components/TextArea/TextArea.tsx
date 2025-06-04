import React from "react"

import { sizeStyles, StyledTextArea, Wrapper } from "./TextArea.styles"
import { TextAreaProps, TextAreaRef } from "./TextArea.types"

export const TextArea = React.forwardRef<TextAreaRef, TextAreaProps>((props, ref) => {
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
      status={status}
      label={label}
      caption={caption}
      formControlStatus={formControlStatus || status}
      isFormItem={isFormItem}
      isRequired={isRequired}
      error={error}
    >
      <StyledTextArea ref={ref} className="custom-text-area" {...otherProps} css={styles} />
    </Wrapper>
  )
})
