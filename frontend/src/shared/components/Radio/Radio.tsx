import ConfigProvider from "antd/es/config-provider"
import React from "react"

import { Body, Caption, Children, sizeStyles, StyledGroup, StyledRadio, Wrapper } from "./Radio.styles"
import { RadioGroupProps, RadioGroupRef, RadioProps, RadioRef } from "./Radio.types"

const ForwardedRadio = React.forwardRef<RadioRef, RadioProps>((props, ref) => {
  const { className, children, size = "m", caption, extraContent, status, error, ...otherProps } = props

  const styles = sizeStyles[size]

  return (
    <ConfigProvider wave={{ disabled: true }}>
      <Wrapper className={className} status={status} css={styles}>
        <Body className="radio-body">
          <StyledRadio ref={ref} {...otherProps}>
            {children && <Children className="radio-children">{children}</Children>}
          </StyledRadio>
          {extraContent}
        </Body>
        {(error || caption) && (
          <Caption className="radio-caption" withChildren={!!children}>
            {error || caption}
          </Caption>
        )}
      </Wrapper>
    </ConfigProvider>
  )
})

const ForwardedRadioGroup = React.forwardRef<RadioGroupRef, RadioGroupProps>((props, ref) => <StyledGroup ref={ref} {...props} />)

export const Radio = Object.assign(ForwardedRadio, { Group: ForwardedRadioGroup })
