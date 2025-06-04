import ConfigProvider from "antd/es/config-provider"
import React from "react"

import { Body, Caption, Children, sizeStyles, StyledSwitch, Wrapper } from "./Switch.styles"
import { SwitchProps, SwitchRef } from "./Switch.types"

export const Switch = React.forwardRef<SwitchRef, SwitchProps>((props, ref) => {
  const { className, children, size = "m", caption, status, error, ...otherProps } = props

  const styles = sizeStyles[size]

  return (
    <ConfigProvider wave={{ disabled: true }}>
      <Wrapper className={className} status={status} css={styles}>
        <Body className="switch-body">
          <StyledSwitch ref={ref} {...otherProps} />
          {children && <Children className="switch-children">{children}</Children>}
        </Body>
        {(error || caption) && (
          <Caption className="switch-caption" withChildren={!!children}>
            {error || caption}
          </Caption>
        )}
      </Wrapper>
    </ConfigProvider>
  )
})
