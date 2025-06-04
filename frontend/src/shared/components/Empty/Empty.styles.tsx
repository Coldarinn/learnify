import styled from "@emotion/styled"
import Empty from "antd/es/empty"

export const StyledEmpty = styled(Empty)`
  display: flex;

  flex-direction: column;

  gap: var(--gap-2xs);

  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  margin: 0;

  background-color: var(--color-surface-base-secondary);
  border-radius: var(--radius-md);

  .ant-empty-image {
    height: 88px;
    margin-bottom: 0;
  }

  .ant-empty-description {
    font: var(--font-caption-s);
    color: var(--color-text-primary);
  }
`
