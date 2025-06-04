import { css } from "@emotion/css"

export const StyledHint = css`
  [data-theme="light"] & {
    --color: var(--color-base-white);
    --bg-color: var(--color-transparent-dark-900);
  }
  [data-theme="dark"] & {
    --color: var(--color-text-primary);
    --bg-color: var(--color-transparent-dark-900);
  }

  .ant-popover-inner {
    max-width: 200px;
    padding: var(--gap-4xs);

    background: var(--bg-color);
    border-radius: var(--radius-xs);
    box-shadow: var(--shadow-tooltip);
  }

  .ant-popover-title {
    margin-bottom: 0;

    font: var(--font-body-normal-s);
    color: var(--color);
  }

  .ant-popover-arrow {
    display: none;
  }
`
