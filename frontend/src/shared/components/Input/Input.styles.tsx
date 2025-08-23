import { type SerializedStyles, css } from "@emotion/react"
import styled from "@emotion/styled"
import AntInput from "antd/es/input"

import { ControlWrapper, ControlWrapperProps } from "../ControlWrapper"
import { InputProps } from "./Input.types"

export const Wrapper = styled(ControlWrapper)`
  ${({ formControlStatus }) => {
    const formStatus: ControlWrapperProps["formControlStatus"] = formControlStatus || ""

    switch (formStatus) {
      case "success":
        return css`
          ${StyledInput}.custom-input {
            background-color: var(--color-surface-base-primary);
            border-color: var(--color-border-success);
          }
        `
      case "error":
        return css`
          ${StyledInput}.custom-input {
            &,
            &:hover,
            &:focus-within {
              background-color: var(--color-surface-base-primary);
              border-color: var(--color-border-critical);
              box-shadow: none;
            }
          }
        `
      default:
        break
    }
  }}
`
export const StyledInput = styled(AntInput)`
  &.custom-input {
    --ant-input-active-shadow: none;

    color: var(--color-text-primary);

    background-color: var(--color-surface-base-primary);
    border: 1px solid var(--color-border-secondary);

    &::placeholder {
      color: var(--color-text-secondary);
    }

    &:hover:not(:focus-within) {
      border-color: var(--color-border-primary);
    }

    &:focus-within {
      caret-color: var(--color-border-accent);

      border-color: var(--color-border-accent);
    }

    &:has(.ant-input-disabled) {
      color: var(--color-text-disabled);

      border-color: var(--color-border-tertiary);

      &::placeholder {
        color: var(--color-text-disabled);
      }

      &:hover {
        background-color: var(--color-surface-base-primary);
        border-color: var(--color-border-tertiary);
      }
    }

    &:-webkit-autofill,
    &:-webkit-autofill:focus,
    input:-webkit-autofill,
    input:-webkit-autofill:focus {
      transition:
        background-color 0s 600000s,
        color 0s 600000s !important;
    }

    .anticon {
      color: inherit;

      svg {
        width: 1em;
        height: 1em;

        fill: currentColor;

        transition: color var(--ant-motion-duration-mid) var(--ant-motion-ease-in-out);
      }
    }
  }
`

export const sizeStyles: Record<NonNullable<InputProps["size"]>, SerializedStyles> = {
  s: css`
    height: 24px;
    padding: var(--gap-6xs) var(--gap-3xs);

    font: var(--font-body-regular-s);

    border-radius: var(--radius-2xs);
  `,
  m: css`
    height: 32px;
    padding: var(--gap-4xs) var(--gap-2xs);

    font: var(--font-body-regular-s);

    border-radius: var(--radius-xs);
  `,
  l: css`
    height: 46px;
    padding: var(--gap-2xs) var(--gap-sm) var(--gap-xs) var(--gap-sm);

    font: var(--font-body-regular-m);

    border-radius: var(--radius-md);
  `,
}
