import styled from "@emotion/styled"
import Alert from "antd/es/alert"

export const StyledAlert = styled(Alert)`
  padding: var(--gap-md) var(--gap-lg);

  background-color: var(--color-surface-base-primary);
  border: 1px solid var(--color-border-tertiary);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-alert);

  .ant-alert-icon {
    margin-right: var(--gap-4xs);

    font-size: 24px;
  }

  .ant-alert-message {
    font: var(--font-subheading-xl);
    color: var(--color-text-primary);

    &:not(:last-child) {
      margin-bottom: var(--gap-3xs);
    }
  }

  .ant-alert-description {
    font: var(--font-body-regular-m);
    color: var(--color-text-primary);
  }

  .ant-alert-close-icon button svg {
    width: 14px;
    height: 14px;

    fill: var(--color-icon-tertiary);
  }

  svg {
    width: 1em;
    height: 1em;

    fill: currentColor;
  }
`
