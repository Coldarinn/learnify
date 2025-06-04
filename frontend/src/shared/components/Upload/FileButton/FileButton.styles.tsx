import { css } from "@emotion/react"
import styled from "@emotion/styled"

import { FileButtonProps } from "./FileButton.types"

export const StyledFileButton = styled.div<Pick<FileButtonProps, "size">>`
  position: relative;

  color: var(--color-text-info);

  svg {
    color: var(--color-icon-tertiary);
  }

  .ant-spin-container {
    display: flex;

    gap: var(--gap-5xs);

    align-items: center;

    opacity: 1;

    &::after {
      background: transparent;
      opacity: 1;
    }

    &.ant-spin-blur {
      opacity: var(--opacity-200);
    }
  }

  .ant-spin svg {
    color: var(--color-icon-info);
  }

  ${({ size }) =>
    ({
      s: css`
        font: var(--font-subheading-m);

        svg {
          font-size: 16px;
        }
      `,
      m: css`
        font: var(--font-subheading-l);

        svg {
          font-size: 20px;
        }
      `,
      l: css`
        font: var(--font-subheading-xl);

        svg {
          font-size: 24px;
        }
      `,
    })[size || "m"]}
`
export const RemoveBtn = styled.button`
  line-height: 0;
`
