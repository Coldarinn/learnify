import AntSelect from "antd/es/select"
import React from "react"

import ArrowIcon from "@/shared/icons/arrow-alt.svg"

import { sizeStyles, SelectStyles, Option, Wrapper } from "./Select.styles"
import { SelectProps, SelectRef } from "./Select.types"

export const Select = React.forwardRef<SelectRef, SelectProps>((props, ref) => {
  const { className, rootClassName = "", size = "m", label, caption, status, formControlStatus, isFormItem, isRequired, error, ...otherProps } = props

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
      <AntSelect
        ref={ref}
        className="custom-select"
        rootClassName={`${SelectStyles} ${rootClassName}`}
        showSearch
        placeholder="Выберите значение"
        suffixIcon={<ArrowIcon />}
        optionRender={(option) => (
          <Option className="ant-select-item-option-content" size={size}>
            {option.label}
          </Option>
        )}
        maxTagCount="responsive"
        {...otherProps}
        css={styles}
      />
    </Wrapper>
  )
})
