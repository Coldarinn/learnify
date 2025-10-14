import styled from "@emotion/styled"
import { Upload } from "antd"

export const StyledDragger = styled(Upload.Dragger)`
  position: relative;

  .ant-upload-drag {
    position: relative;
    border: unset;
    border-radius: inherit;

    .ant-upload-btn {
      padding: var(--gap-2xl);

      border-radius: var(--radius-md);
    }
  }

  .dashed-border-svg {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    pointer-events: none;
    border-radius: var(--radius-md);
    overflow: hidden;

    rect {
      width: 100%;
      height: 100%;

      rx: var(--radius-md);
      fill: none;

      stroke: var(--color-border-accent);
      stroke-width: 2;
      stroke-dasharray: 12 12; /* первое число - длина штриха, второе - пробел */
      stroke-linecap: round;

      transition: stroke var(--ant-motion-duration-mid) ease-in-out;
    }
  }

  .ant-upload-drag-container {
    .dragger-upload-icon {
      width: 40px;
      height: 40px;
      color: var(--color-icon-accent);
    }
  }

  .ant-upload-list.ant-upload-list-text:before {
    display: none;
  }

  &:has(.ant-upload-drag-hover) .dashed-border-svg rect {
    stroke: var(--color-border-secondary);
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
