import styled from "@emotion/styled"
import Upload from "antd/es/upload"

export const StyledDragger = styled(Upload.Dragger)`
  .ant-upload-drag {
    border-color: var(--color-border-secondary);
    background: transparent;

    .ant-upload-btn {
      padding: var(--gap-2xl);

      border-radius: var(--radius-md);
    }
  }

  .ant-upload-drag-container {
    .dragger-upload-icon {
      width: 40px;
      height: 40px;

      fill: var(--color-icon-accent);
    }
  }

  .ant-upload-list.ant-upload-list-text:before {
    display: none;
  }
`
export const Text = styled.div`
  margin-top: var(--gap-xs);

  font: var(--font-subheading-m);
  color: var(--color-text-primary);
  text-align: center;

  > span {
    color: var(--color-text-accent);
  }
`
