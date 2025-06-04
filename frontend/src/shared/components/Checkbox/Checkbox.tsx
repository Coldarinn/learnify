import AntCheckbox from "antd/es/checkbox"
import ConfigProvider from "antd/es/config-provider"
import React from "react"

import { Body, Caption, Children, sizeStyles, StyledCheckbox, Wrapper } from "./Checkbox.styles"
import { CheckboxProps, CheckboxRef } from "./Checkbox.types"

const ForwardedCheckbox = React.forwardRef<CheckboxRef, CheckboxProps>((props, ref) => {
  const { className, children, size = "m", caption, extraContent, status, error, ...otherProps } = props

  const styles = sizeStyles[size]

  return (
    <ConfigProvider wave={{ disabled: true }}>
      <Wrapper className={className} status={status} css={styles}>
        <Body className="checkbox-body">
          <StyledCheckbox ref={ref} {...otherProps}>
            {children && <Children className="checkbox-children">{children}</Children>}
          </StyledCheckbox>
          {extraContent}
        </Body>
        {(error || caption) && (
          <Caption className="checkbox-caption" withChildren={!!children}>
            {error || caption}
          </Caption>
        )}
      </Wrapper>
    </ConfigProvider>
  )
})

export const Checkbox = Object.assign(ForwardedCheckbox, { Group: AntCheckbox.Group })
