import { css } from "@emotion/css"

import { DropdownProps } from "./Dropdown.types"

export const DropdownStyles = css`
  &.ant-select-dropdown .ant-cascader-menu-item {
    padding: var(--padding);

    font: var(--font);
  }

  .cascader-dropdown-footer {
    display: none;
  }
`
export const sizeStyles = (size: DropdownProps["size"]) =>
  ({
    s: css`
      --font: var(--font-body-medium-s);
      --padding: var(--gap-3xs);
    `,
    m: css`
      --font: var(--font-body-medium-s);
      --padding: var(--gap-2xs);
    `,
    l: css`
      --font: var(--font-body-medium-m);
      --padding: var(--gap-sm);
    `,
  })[size || "m"]
