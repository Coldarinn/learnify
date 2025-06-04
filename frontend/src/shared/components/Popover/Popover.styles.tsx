import { css } from "@emotion/css"

export const StyledPopover = css`
  &.ant-popover {
    .ant-popover-content {
      .ant-popover-inner {
        max-width: 360px;
        padding: var(--gap-xl);

        background-color: var(--color-surface-base-primary);
        border: 1px solid var(--color-border-tertiary);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-tooltip);
      }
    }
  }
`
