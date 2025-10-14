import { SerializedStyles, css } from "@emotion/react"
import styled from "@emotion/styled"
import { Spin } from "antd"

import { SpinProps } from "./Spin.types"

export const StyledSpin = styled(Spin)<Pick<SpinProps, "variant" | "color">>`
  font-size: var(--ant-spin-dot-size);
  line-height: 0;

  ${({ variant, color = "var(--color-icon-tertiary)" }) =>
    variant === "round" &&
    css`
      color: ${color};
    `}

  &.ant-spin-nested-loading .custom-holder {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`
export const sizeStyles: Record<NonNullable<SpinProps["size"]>, SerializedStyles> = {
  s: css`
    && {
      --ant-spin-dot-size: 16px;
    }
  `,
  m: css`
    && {
      --ant-spin-dot-size: 24px;
    }
  `,
  l: css`
    && {
      --ant-spin-dot-size: 36px;
    }
  `,
}
