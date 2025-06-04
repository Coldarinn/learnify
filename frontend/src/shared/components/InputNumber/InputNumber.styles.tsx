import { css, type SerializedStyles } from "@emotion/react"
import styled from "@emotion/styled"
import InputNumber from "antd/es/input-number"

import { ControlWrapper, ControlWrapperProps } from "@/shared/components/ControlWrapper"

import { InputNumberProps } from "./InputNumber.types"

export const Wrapper = styled(ControlWrapper)`
  ${({ formControlStatus }) => {
    const formStatus: ControlWrapperProps["formControlStatus"] = formControlStatus || ""

    switch (formStatus) {
      case "success":
        return css`
          ${StyledInputNumber}.custom-input-number {
            border-color: var(--color-border-success);
          }
        `
      case "error":
        return css`
          ${StyledInputNumber}.custom-input-number {
            border-color: var(--color-border-critical);
          }
        `
      default:
        break
    }
  }}
`
export const StyledInputNumber = styled(InputNumber)`
  --ant-input-number-handle-width: 21px;

  width: 100%;

  border: 1px solid var(--color-border-secondary);

  .ant-input-number-handler-wrap {
    border-start-end-radius: inherit;
    border-end-end-radius: inherit;
  }

  .ant-input-number-input-wrap {
    height: 100%;

    border-radius: inherit;
  }

  input.ant-input-number-input {
    height: 100%;

    color: var(--color-text-primary);

    background-color: var(--color-surface-base-primary);
    border-radius: inherit;

    &::placeholder {
      color: var(--color-text-secondary);
    }
  }

  &:hover:not(:focus-within):not(:has(.ant-input-number-disabled)) {
    border-color: var(--color-border-primary);
  }

  &:focus-within {
    caret-color: var(--color-border-accent);

    border-color: var(--color-border-accent);

    .ant-input-number-handler-wrap {
      width: var(--ant-input-number-handle-width);

      opacity: 1;
    }
  }

  &.ant-input-number-disabled {
    border-color: var(--color-border-tertiary);

    input {
      color: var(--color-text-disabled);

      background-color: var(--color-surface-base-secondary);
      border-radius: inherit;

      &::placeholder {
        color: var(--color-text-disabled);
      }
    }

    &:hover:not([disabled]) {
      background-color: none;
      border-color: var(--color-border-tertiary);
    }
  }
`

export const sizeStyles: Record<NonNullable<InputNumberProps["size"]>, SerializedStyles> = {
  s: css`
    height: 24px;

    border-radius: var(--radius-2xs);

    input.ant-input-number-input {
      padding: 0 var(--gap-xl) 0 var(--gap-3xs);

      font: var(--font-body-normal-s);
    }
  `,
  m: css`
    height: 34px;

    border-radius: var(--radius-xs);

    input.ant-input-number-input {
      padding: 0 var(--gap-xl) 0 var(--gap-2xs);

      font: var(--font-body-normal-s);
    }
  `,
  l: css`
    height: 46px;

    border-radius: var(--radius-md);

    input.ant-input-number-input {
      padding: 0 var(--gap-xl) 0 var(--gap-sm);

      font: var(--font-body-normal-m);
    }
  `,
}
