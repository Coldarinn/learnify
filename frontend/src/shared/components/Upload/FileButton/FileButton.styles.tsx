import { css } from "@emotion/react"
import styled from "@emotion/styled"

import { FileButtonProps } from "./FileButton.types"

export const StyledFileButton = styled.div<Pick<FileButtonProps, "size">>`
  position: relative;

  color: var(--color-text-primary);

  transition: color var(--ant-motion-duration-mid) var(--ant-motion-ease-in-out);

  &:hover:not(:has(.ant-spin-nested-loading)) {
    color: var(--color-text-accent-hover);
  }

  svg {
    width: 1em;
    height: 1em;

    fill: var(--color-icon-accent);
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
    color: var(--color-icon-accent);
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
  svg {
    fill: var(--color-icon-tertiary);
  }

  line-height: 0;
`
