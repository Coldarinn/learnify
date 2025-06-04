import { css } from "@emotion/react"
import styled from "@emotion/styled"

import { Input } from "@/shared/components/Input"

import { SearchProps } from "./Search.types"

export const StyledSearch = styled(Input)`
  .custom-input .custom-input-search {
    color: inherit;

    background-color: none;
  }
`
export const Icon = styled.span<{ size: SearchProps["size"] }>`
  svg {
    color: var(--color-icon-secondary);

    ${({ size }) =>
      size === "s"
        ? css`
            font-size: 16px;
          `
        : css`
            font-size: 20px;
          `}
  }
`
