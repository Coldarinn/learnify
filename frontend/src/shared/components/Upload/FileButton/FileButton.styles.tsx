import { css } from "@emotion/react"
import styled from "@emotion/styled"

import { FileButtonProps } from "./FileButton.types"

export const StyledFileButton = styled.div<Pick<FileButtonProps, "size">>`
  position: relative;

  color: var(--color-text-primary);

  transition: color var(--ant-motion-duration-mid) var(--ant-motion-ease-in-out);

  &:hover:not(:has(.ant-spin-spinning)) {
    color: var(--color-text-accent-hover);
  }

  svg {
    width: 1em;
    height: 1em;

    * {
      fill: currentColor;
    }
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

  .file-icon {
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
  cursor: pointer;

  &:hover svg {
    color: var(--color-icon-accent);
  }

  svg {
    display: block;

    color: var(--color-icon-tertiary);

    transition: color var(--ant-motion-duration-mid) var(--ant-motion-ease-in-out);
  }
`
