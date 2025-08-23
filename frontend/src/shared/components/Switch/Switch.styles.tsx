import { type SerializedStyles, css } from "@emotion/react"
import styled from "@emotion/styled"
import Switch from "antd/es/switch"

import { SwitchProps } from "./Switch.types"

export const Wrapper = styled.div<Pick<SwitchProps, "status">>`
  --switch-gap: var(--gap-5xs);
  --caption-gap: var(--gap-6xs);
  --switch-track-min-width: 32px;
  --font: var(--font-body-medium-m);

  position: relative;

  &:has(.switch-caption) {
    padding-bottom: calc(12px + var(--caption-gap));
  }

  ${({ status }) => {
    const formStatus = status || ""

    switch (formStatus) {
      case "success":
        return css`
          .switch-caption {
            color: var(--color-border-success);
          }
        `
      case "error":
        return css`
          .switch-caption {
            color: var(--color-border-critical);
          }
        `
      default:
        break
    }
  }}
`
export const Body = styled.div`
  display: flex;

  gap: var(--switch-gap);

  align-items: center;
`
export const Children = styled.div`
  display: inline-flex;

  gap: var(--gap-5xs);

  align-items: center;

  font: var(--font);
  color: var(--color-text-primary);
`
export const Caption = styled.div<{ withChildren?: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;

  max-width: 100%;
  padding-left: ${({ withChildren }) => (withChildren ? "calc(var(--switch-track-min-width) + var(--switch-gap))" : 0)};
  overflow: hidden;

  font: var(--font-caption-xs);
  color: var(--color-text-secondary);
  text-overflow: ellipsis;
  white-space: nowrap;

  transform: translateY(-100%);
`
export const StyledSwitch = styled(Switch)`
  &.ant-switch {
    --ant-color-primary: var(--color-surface-elements-accent);
    --ant-color-primary-hover: var(--color-surface-elements-accent);

    --ant-switch-track-height: 18px;
    --ant-switch-track-min-width: var(--switch-track-min-width);
    --ant-switch-track-padding: 2px;
    --ant-switch-handle-bg: var(--color-base-white);
    --ant-switch-handle-size: 14px;
    --ant-switch-inner-max-margin: calc(var(--switch-track-min-width) / 2);
    --ant-switch-inner-min-margin: calc(var(--switch-track-min-width) / 2);

    background-color: var(--color-surface-base-quaternary);

    &:hover:not(.ant-switch-disabled) {
      background-color: var(--color-surface-base-quaternary-hover);
    }

    &.ant-switch-checked {
      background-color: var(--color-surface-elements-accent);

      &:hover:not(.ant-switch-disabled) {
        background-color: var(--color-surface-elements-accent);
        opacity: var(--opacity-800);
      }
    }

    &.ant-switch-disabled {
      &.ant-switch-checked {
        opacity: var(--opacity-300);
      }

      & ~ ${Children} {
        color: var(--color-text-disabled);
      }
    }
  }
`

export const sizeStyles: Record<NonNullable<SwitchProps["size"]>, SerializedStyles> = {
  s: css`
    --font: var(--font-body-medium-s);
    --switch-track-min-width: 30px;

    .ant-switch {
      --ant-switch-track-height: 16px;
      --ant-switch-handle-size: 12px;
    }
  `,
  m: css``,
}
