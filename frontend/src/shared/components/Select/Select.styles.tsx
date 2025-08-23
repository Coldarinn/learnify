import { css as emotionCss } from "@emotion/css"
import { type SerializedStyles, css } from "@emotion/react"
import styled from "@emotion/styled"

import { ControlWrapper, ControlWrapperProps } from "../ControlWrapper"
import { SelectProps } from "./Select.types"

export const Wrapper = styled(ControlWrapper)`
  .custom-select {
    min-width: 30px;
  }

  ${({ formControlStatus }) => {
    const formStatus: ControlWrapperProps["formControlStatus"] = formControlStatus || ""

    switch (formStatus) {
      case "success":
        return css`
          .custom-select .ant-select-selector {
            border-color: var(--color-border-success);
          }
        `
      case "error":
        return css`
          .custom-select .ant-select-selector {
            border-color: var(--color-border-critical);
          }
        `
      default:
        break
    }
  }}
`
export const SelectStyles = emotionCss`
  &.ant-select-dropdown {
    --ant-color-bg-elevated: var(--color-surface-base-primary);
    --ant-select-option-selected-bg: var(--color-surface-base-secondary);
  }

  &.ant-select {
    --ant-select-selector-bg: var(--color-surface-base-primary);
    --ant-color-border: var(--color-border-secondary);

    .ant-select-selection-wrap {
      height: 100%;
    }

    .ant-select-selection-placeholder {
      color: var(--color-text-secondary);
    }

    .ant-select-selection-item {
      color: var(--color-text-primary);
    }

    .ant-select-item-option {
      color: var(--color-text-primary);

      &.ant-select-item-option-disabled {
        color: var(--color-text-disabled);
      }
    }

    .ant-select-selection-item,
    .ant-select-selection-search-input,
    .ant-select-selection-placeholder {
      caret-color: var(--color-text-accent);
    }

    &.ant-select-multiple {
      .ant-select-selection-item {
        height: fit-content;

        color: var(--color-text-accent);

        background-color: var(--color-surface-elements-sub-accent);
        border: 1px solid var(--color-border-accent-soft);

        &-remove {
          color: inherit;
        }
      }

      .ant-select-selection-placeholder {
        inset-inline-start: 0;
      }

      .ant-select-selection-search {
        margin-inline-start: 0;
      }

      .ant-select-selection-overflow {
        align-content: center;
      }

      .ant-select-selection-overflow-item-suffix {
        height: 100%;
      }
    }

    &.ant-select-dropdown {
      background-color: var(--color-surface-base-primary);
      border: 1px solid var(--color-border-tertiary);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-tooltip);
    }

    &.ant-select-disabled:not(.ant-select-customize-input) .ant-select-selector {
      background-color: var(--color-surface-base-primary);
      border-color: var(--color-border-tertiary);

      .ant-select-selection-placeholder {
        color: var(--color-text-disabled);
      }

      & + .ant-select-arrow {
        color: var(--color-icon-tertiary);
      }
    }

    .ant-select-arrow {
      transition: transform var(--ant-motion-duration-mid) var(--ant-motion-ease-in-out);
    }
      
    &.ant-select-open {
      .ant-select-arrow {
        transform: rotate(180deg);
      }
    }
  }
`

export const Option = styled.span<Pick<SelectProps, "size">>`
  ${({ size = "m" }) =>
    ({
      s: css`
        font: var(--font-body-medium-s);
        font-weight: 500;
      `,
      m: css`
        font: var(--font-body-medium-s);
        font-weight: 500;
      `,
      l: css`
        font: var(--font-body-medium-m);
        font-weight: 500;
      `,
    })[size]}
`

export const sizeStyles: Record<NonNullable<SelectProps["size"]>, SerializedStyles> = {
  s: css`
    --ant-font-size-icon: 12px;

    min-height: 24px;

    .ant-select-selector {
      padding: 0 var(--gap-3xs);

      border-radius: var(--radius-2xs);
    }

    .ant-select-selection-item,
    .ant-select-selection-search-input,
    .ant-select-selection-placeholder {
      font: var(--font-body-regular-s);
    }

    .ant-select-item-option-content {
      font: var(--font-body-medium-s);
      font-weight: 500;
    }

    &.ant-select-multiple .ant-select-selection-item {
      padding-inline-start: var(--gap-4xs) !important;
      padding-inline-end: var(--gap-4xs) !important;
    }
  `,
  m: css`
    --ant-font-size-icon: 20px;

    min-height: 32px;

    .ant-select-selector {
      padding: 0 var(--gap-xs);

      border-radius: var(--radius-xs);
    }

    .ant-select-selection-item,
    .ant-select-selection-search-input,
    .ant-select-selection-placeholder {
      font: var(--font-body-regular-s);
    }

    .ant-select-item-option-content {
      font: var(--font-body-medium-s);
      font-weight: 500;
    }

    &.ant-select-multiple .ant-select-selection-item {
      padding-inline-start: var(--gap-3xs) !important;
      padding-inline-end: var(--gap-3xs) !important;
    }
  `,
  l: css`
    --ant-font-size-icon: 20px;

    min-height: 46px;

    .ant-select-selector {
      padding: 0 var(--gap-sm);

      border-radius: var(--radius-md);
    }

    .ant-select-selection-item,
    .ant-select-selection-search-input,
    .ant-select-selection-placeholder {
      font: var(--font-body-regular-m);
    }

    .ant-select-item-option-content {
      font: var(--font-body-medium-m);
      font-weight: 500;
    }

    &.ant-select-multiple .ant-select-selection-item {
      padding-inline-start: var(--gap-3xs) !important;
      padding-inline-end: var(--gap-3xs) !important;
    }
  `,
}
