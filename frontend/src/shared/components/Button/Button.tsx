import { LoadingOutlined } from "@ant-design/icons"
import { css } from "@emotion/react"
import ConfigProvider from "antd/es/config-provider"
import React from "react"

import { StyledButton, sizeStyles, typeStyles } from "./Button.styles"
import { ButtonProps, ButtonRef } from "./Button.types"

export const Button = React.forwardRef<ButtonRef, ButtonProps>((props, ref) => {
  const { className: classNameProp = "", type = "main-primary", size = "m", children, loading, ...otherProps } = props

  const styles = css(sizeStyles[size], typeStyles[type])

  const className = `${classNameProp}${children ? "" : " ant-btn-icon-only"}`

  return (
    <ConfigProvider wave={{ disabled: true }}>
      <StyledButton ref={ref} className={className} {...otherProps} isLoading={loading} css={styles}>
        {children}
        {loading && (
          <span className="ant-btn-loading-icon">
            <LoadingOutlined />
          </span>
        )}
      </StyledButton>
    </ConfigProvider>
  )
})
