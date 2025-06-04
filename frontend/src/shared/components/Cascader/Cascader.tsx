import AntCascader from "antd/es/cascader"
import React from "react"

import { Empty } from "@/shared/components/Empty"
import ArrowIcon from "@/shared/icons/arrow-alt.svg"

import { CascaderStyles, StyledButton, Wrapper } from "./Cascader.styles"
import { CascaderProps, CascaderRef } from "./Cascader.types"
import { Dropdown } from "./Dropdown"

export const Cascader = React.forwardRef<CascaderRef, CascaderProps>((props, ref) => {
  const {
    className,
    rootClassName = "",
    size = "m",
    label,
    caption,
    status,
    formControlStatus,
    isFormItem,
    isRequired,
    error,
    children,
    onClear,
    ...otherProps
  } = props

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
      {/* @ts-ignore */}
      <AntCascader
        ref={ref}
        rootClassName={`${CascaderStyles} ${rootClassName}`}
        expandIcon={<ArrowIcon />}
        suffixIcon={<ArrowIcon />}
        dropdownRender={(menus) => <Dropdown menus={menus} onClear={onClear} />}
        notFoundContent={<Empty />}
        onClear={onClear}
        maxTagCount="responsive"
        {...otherProps}
      >
        {typeof children === "string" ? (
          <StyledButton variant="solid" type="extra-outline" size="s" icon={<ArrowIcon />} iconPosition="end" disabled={otherProps.disabled}>
            {children}
          </StyledButton>
        ) : children ? (
          <>{children}</>
        ) : undefined}
      </AntCascader>
    </Wrapper>
  )
})
