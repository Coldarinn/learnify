import { css, type SerializedStyles } from "@emotion/react"
import styled from "@emotion/styled"
import Tabs from "antd/es/tabs"

import { TabsProps } from "./Tabs.types"

export const StyledTabs = styled(Tabs)<{ customType?: TabsProps["type"] }>`
  .ant-tabs-nav {
    margin: 0;

    &::before {
      display: none;
    }
  }

  .ant-tabs-nav-operations {
    display: none;
  }

  .ant-tabs-ink-bar {
    height: 2px;

    background-color: var(--color-border-accent);
  }

  .ant-tabs-nav-list {
    gap: var(--gap);

    .ant-tabs-tab {
      height: var(--tab-height);
      padding: 0;
      margin: 0;

      font: var(--font);
      color: var(--color);

      background-color: var(--bg-color);

      transition: var(--ant-motion-duration-slow);

      .ant-tabs-tab-btn {
        color: inherit;
        text-shadow: none;

        transition: none;

        &:active {
          color: inherit;
        }
      }

      &:not(.ant-tabs-tab-disabled) {
        &.ant-tabs-tab-active {
          color: var(--color-active);

          background-color: var(--bg-color-active);
        }

        &:hover:not(.ant-tabs-tab-active) {
          color: var(--color-hover);

          background-color: var(--bg-color-hover);
        }
      }

      &.ant-tabs-tab-disabled {
        color: var(--color-text-disabled);

        background-color: transparent;
      }
    }
  }

  .ant-tabs-content-holder {
    display: none;
  }

  ${({ customType }) =>
    customType?.includes("square") &&
    css`
      .ant-tabs-nav {
        margin: 0;
      }

      .ant-tabs-ink-bar {
        display: none;
      }

      .ant-tabs-nav .ant-tabs-nav-wrap {
        flex: 0 0 auto;

        padding: var(--gap-5xs);

        background-color: var(--color-surface-base-secondary);
        border: 1px solid var(--color-border-tertiary);
        border-radius: var(--radius-sm);
      }

      .ant-tabs-nav-list {
        gap: 0;

        .ant-tabs-tab {
          height: var(--tab-height-square);
          padding: 0 var(--tab-padding);

          border-radius: var(--radius);

          &.ant-tabs-tab-active {
            color: var(--color-active);

            background-color: var(--bg-color-active);
            box-shadow: var(--shadow-tooltip);
          }
        }
      }
    `}
`

export const sizeStyles: Record<NonNullable<TabsProps["size"]>, SerializedStyles> = {
  s: css`
    --font: var(--font-subheading-m);
    --tab-height: calc(34px + var(--ant-line-width));
    --tab-height-square: 28px;
    --tab-padding: var(--gap-3xs);
    --gap: var(--gap-md);
    --radius: var(--radius-xs);
    --ant-line-width: 2px;
  `,
  m: css`
    --font: var(--font-subheading-l);
    --tab-height: calc(38px + var(--ant-line-width));
    --tab-height-square: 32px;
    --tab-padding: var(--gap-xs);
    --gap: var(--gap-md);
    --radius: var(--radius-sm);
    --ant-line-width: 2px;
  `,
  l: css`
    --font: var(--font-subheading-xl);
    --tab-height: calc(42px + var(--ant-line-width));
    --tab-height-square: 40px;
    --tab-padding: var(--gap-xs);
    --gap: var(--gap-md);
    --radius: var(--radius-sm);
    --ant-line-width: 2px;
  `,
}
export const typeStyles: Record<NonNullable<TabsProps["type"]>, SerializedStyles> = {
  square: css`
    --color: var(--color-text-secondary);
    --color-hover: var(--color-text-primary);
    --color-active: var(--color-text-primary);
    --bg-color: transparent;
    --bg-color-hover: transparent;
    --bg-color-active: var(--color-surface-base-primary);
  `,
  "square-orange": css`
    --color: var(--color-text-secondary);
    --color-hover: var(--color-text-accent-hover);
    --color-active: var(--color-text-accent);
    --bg-color: transparent;
    --bg-color-hover: transparent;
    --bg-color-active: var(--color-surface-base-primary);
  `,
  "square-accent": css`
    --color: var(--color-text-secondary);
    --color-hover: var(--color-base-white);
    --color-active: var(--color-base-white);
    --bg-color: transparent;
    --bg-color-hover: var(--color-surface-elements-accent-hover);
    --bg-color-active: var(--color-surface-elements-accent);
  `,
  line: css`
    --color: var(--color-text-primary);
    --color-hover: var(--color-text-accent-hover);
    --color-active: var(--color-text-accent);
    --bg-color: transparent;
    --bg-color-hover: transparent;
    --bg-color-active: transparent;
  `,
}
