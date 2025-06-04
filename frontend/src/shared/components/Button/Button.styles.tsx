import { css, type SerializedStyles } from "@emotion/react"
import styled from "@emotion/styled"
import Button from "antd/es/button"

import { ButtonProps } from "./Button.types"

export const StyledButton = styled(Button)<{ isLoading?: ButtonProps["loading"] }>`
  --height: 40px;
  --gap: var(--gap-3xs);
  --padding: var(--gap-lg);
  --font: var(--font-subheading-l);
  --radius: var(--radius-md);
  --loader-size: 20px;

  gap: var(--gap);

  height: var(--height);
  padding: 0 var(--padding);

  font: var(--font);
  color: var(--color);

  background-color: var(--bg-color);
  border: 0px solid var(--border-color);
  border-radius: var(--radius);
  box-shadow: none;

  .ant-btn-icon {
    line-height: 0;

    svg {
      font-size: var(--loader-size);
      vertical-align: middle;
    }
  }

  .ant-btn-loading-icon svg {
    font-size: var(--loader-size);
  }

  &:disabled {
    color: var(--color-disabled);

    background-color: var(--bg-color-disabled);
    border-color: var(--border-color-disabled);
  }

  &.ant-btn-icon-only {
    width: var(--height);
    padding: 0;
  }

  &.ant-btn-circle.ant-btn {
    min-width: 0;
  }

  ${({ isLoading }) =>
    isLoading ?
      css`
        color: var(--bg-color-loading);

        cursor: default;

        background-color: var(--bg-color-loading);

        &:not(:disabled):not(.ant-btn-disabled):hover,
        &:not(:disabled):not(.ant-btn-disabled):active {
          color: var(--bg-color-loading);

          background-color: var(--bg-color-loading);
          border-color: var(--border-color);
        }
      `
    : css`
        &:not(:disabled):not(.ant-btn-disabled):hover {
          color: var(--color-hover);

          background-color: var(--bg-color-hover);
          border-color: var(--border-color-hover);
        }

        &:not(:disabled):not(.ant-btn-disabled):active {
          color: var(--color-active);

          background-color: var(--bg-color-active);
          border-color: var(--border-color-active);
        }
      `}

  .ant-btn-loading-icon {
    position: absolute;

    display: flex;

    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    font-size: var(--loader-size);
    color: var(--color);

    background: inherit;
    border-radius: inherit;
  }
`

export const sizeStyles: Record<NonNullable<ButtonProps["size"]>, SerializedStyles> = {
  xs: css`
    &${StyledButton} {
      --height: 24px;
      --gap: var(--gap-5xs);
      --padding: var(--gap-xs);
      --font: var(--font-subheading-s);
      --radius: var(--radius-xs);
      --loader-size: 14px;
    }
  `,
  s: css`
    &${StyledButton} {
      --height: 32px;
      --gap: var(--gap-5xs);
      --padding: var(--gap-md);
      --font: var(--font-subheading-m);
      --radius: var(--radius-sm);
      --loader-size: 16px;
    }
  `,
  m: css``,
  l: css`
    &${StyledButton} {
      --height: 50px;
      --padding: var(--gap-xl);
    }
  `,
  xl: css`
    &${StyledButton} {
      --height: 56px;
      --padding: var(--gap-2xl);
      --font: var(--font-subheading-xl);
      --loader-size: 24px;
    }
  `,
}

export const typeStyles: Record<NonNullable<ButtonProps["type"]>, SerializedStyles> = {
  "main-primary": css`
    --bg-color: var(--color-surface-elements-accent);
    --bg-color-hover: var(--color-surface-elements-accent-hover);
    --bg-color-active: var(--color-surface-elements-accent-pressed);
    --bg-color-disabled: var(--color-surface-base-secondary);
    --bg-color-loading: var(--color-surface-elements-accent);
    --color: var(--color-base-white);
    --color-hover: var(--color-base-white);
    --color-active: var(--color-base-white);
    --color-disabled: var(--color-text-disabled);
  `,
  "main-secondary": css`
    --bg-color: var(--color-surface-elements-sub-accent);
    --bg-color-hover: var(--color-surface-elements-sub-accent-hover);
    --bg-color-active: var(--color-surface-elements-sub-accent-pressed);
    --bg-color-disabled: var(--color-surface-base-secondary);
    --bg-color-loading: var(--color-surface-elements-sub-accent);
    --color: var(--color-text-accent);
    --color-hover: var(--color-text-accent);
    --color-active: var(--color-text-accent);
    --color-disabled: var(--color-text-disabled);
  `,
  "main-outline": css`
    --bg-color: transparent;
    --bg-color-hover: var(--color-surface-elements-sub-accent-hover);
    --bg-color-active: var(--color-surface-elements-sub-accent-pressed);
    --bg-color-disabled: transparent;
    --bg-color-loading: transparent;
    --color: var(--color-text-accent);
    --color-hover: var(--color-text-accent);
    --color-active: var(--color-text-accent);
    --color-disabled: var(--color-text-disabled);
    --border-color: var(--color-border-accent);
    --border-color-hover: var(--color-border-accent);
    --border-color-active: var(--color-border-accent);
    --border-color-disabled: var(--color-border-secondary);

    border-width: 1px;

    .anticon-loading {
      color: var(--color);
    }
  `,
  link: css`
    --bg-color: transparent;
    --bg-color-hover: transparent;
    --bg-color-active: transparent;
    --bg-color-disabled: transparent;
    --bg-color-loading: transparent;
    --color: var(--color-text-accent);
    --color-hover: var(--color-text-accent-hover);
    --color-active: var(--color-text-accent);
    --color-disabled: var(--color-text-disabled);

    padding-right: 0;
    padding-left: 0;

    .anticon-loading {
      color: var(--color);
    }
  `,
  "extra-primary": css`
    --bg-color: var(--color-surface-base-tertiary);
    --bg-color-hover: var(--color-surface-base-tertiary-hover);
    --bg-color-active: var(--color-surface-base-tertiary-pressed);
    --bg-color-disabled: transparent;
    --bg-color-loading: var(--color-surface-base-tertiary);
    --color: var(--color-text-primary);
    --color-hover: var(--color-text-primary);
    --color-active: var(--color-text-primary);
    --color-disabled: var(--color-text-disabled);
  `,
  "extra-secondary": css`
    --bg-color: transparent;
    --bg-color-hover: transparent;
    --bg-color-active: transparent;
    --bg-color-disabled: transparent;
    --bg-color-loading: transparent;
    --color: var(--color-text-secondary);
    --color-hover: var(--color-text-accent-hover);
    --color-active: var(--color-text-accent);
    --color-disabled: var(--color-text-disabled);
  `,
  "extra-outline": css`
    --bg-color: transparent;
    --bg-color-hover: transparent;
    --bg-color-active: transparent;
    --bg-color-disabled: transparent;
    --bg-color-loading: transparent;
    --color: var(--color-text-primary);
    --color-hover: var(--color-text-accent-hover);
    --color-active: var(--color-text-accent);
    --color-disabled: var(--color-text-disabled);
    --border-color: var(--color-border-primary);
    --border-color-hover: var(--color-border-accent-soft);
    --border-color-active: var(--color-border-accent);
    --border-color-disabled: var(--color-border-tertiary);

    border-width: 1px;

    &:has(.anticon-loading) {
      border-color: var(--border-color-active);
    }

    .anticon-loading {
      color: var(--color);
    }
  `,
}
