import styled from "@emotion/styled"
import Progress from "antd/es/progress"

export const StyledProgress = styled(Progress)`
  .ant-progress-inner {
    background: var(--color-surface-base-secondary);
    border: 1px solid var(--color-border-tertiary);
  }

  .ant-progress-text {
    font: var(--font-subheading-s);
    color: var(--color-text-primary);
  }
`
