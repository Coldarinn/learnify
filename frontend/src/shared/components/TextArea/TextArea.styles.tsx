import { css, type SerializedStyles } from "@emotion/react"
import styled from "@emotion/styled"
import TextArea from "antd/es/input/TextArea"

import { ControlWrapper } from "@/shared/components/ControlWrapper"

import { TextAreaProps } from "./TextArea.types"

export const Wrapper = styled(ControlWrapper)<Pick<TextAreaProps, "status">>`
  ${({ status }) =>
    ({
      success: css`
        ${StyledTextArea}.custom-text-area {
          border-color: var(--color-border-success);
        }
      `,
      error: css`
        ${StyledTextArea}.custom-text-area {
          border-color: var(--color-border-critical);
        }
      `,
      "": "",
    })[status || ""]}
`
export const StyledTextArea = styled(TextArea)`
  &.ant-input {
    --ant-input-active-shadow: none;

    color: var(--color-text-primary);

    resize: none;

    background-color: var(--color-surface-base-primary);
    border: 1px solid var(--color-border-secondary);

    &::placeholder {
      color: var(--color-text-secondary);
    }

    @media (any-hover: hover) {
      &:hover:not(.ant-input-disabled) {
        border-color: var(--color-border-primary);
      }
    }

    &:focus {
      caret-color: var(--color-border-accent);

      border-color: var(--color-border-accent);
    }
  }

  &.ant-input-disabled {
    color: var(--color-text-disabled);

    border-color: var(--color-border-tertiary);

    &::placeholder {
      color: var(--color-text-disabled);
    }
  }
`

export const sizeStyles: Record<NonNullable<TextAreaProps["size"]>, SerializedStyles> = {
  s: css`
    &.ant-input {
      height: 56px;
      padding: var(--gap-3xs);

      font: var(--font-subheading-m);

      border-radius: var(--radius-sm);
    }
  `,
  m: css`
    &.ant-input {
      height: 86px;
      padding: var(--gap-2xs);

      font: var(--font-subheading-l);

      border-radius: var(--radius-md);
    }
  `,
  l: css`
    &.ant-input {
      height: 106px;
      padding: var(--gap-sm);

      font: var(--font-subheading-l);

      border-radius: var(--radius-md);
    }
  `,
}
