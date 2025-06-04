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
  }

  .ant-alert-message {
    margin-bottom: var(--gap-3xs);

    font: var(--font-subheading-xl);
    color: var(--color-text-primary);
  }

  .ant-alert-description {
    font: var(--font-body-normal-m);
    color: var(--color-text-primary);
  }

  .ant-alert-close-icon button {
    color: var(--color-icon-tertiary);

    svg {
      font-size: 14px;
    }
  }
`
