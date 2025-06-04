import { css } from "@emotion/css"
import styled from "@emotion/styled"
import Drawer from "antd/es/drawer"
import type { DrawerClassNames } from "antd/es/drawer/DrawerPanel"

export const StyledDrawer = styled(Drawer)``

export const classNames: DrawerClassNames = {
  wrapper: css`
    &.ant-drawer-content-wrapper {
      min-width: 320px;
      max-width: 480px;

      border-radius: var(--radius-xl) 0 0 var(--radius-xl);
      box-shadow:
        0px 8px 40px 0px #5d5d5d33,
        0px 4px 6px 0px #0000000a;
    }
  `,
  content: css`
    &.ant-drawer-content {
      background: var(--color-surface-base-primary);
      border-radius: var(--radius-xl) 0 0 var(--radius-xl);
    }
  `,
  header: css`
    &.ant-drawer-header {
      --padding: var(--gap-xl);

      position: relative;

      padding: var(--padding);

      border: none;

      &::before {
        position: absolute;
        right: var(--padding);
        bottom: 0;
        left: var(--padding);

        height: 1px;

        content: "";

        background-color: var(--color-border-tertiary);
      }

      .ant-drawer-header-title {
        .ant-drawer-close {
          width: auto;
          height: auto;
          margin-inline-end: var(--gap-3xs);

          background: none;
        }
        .ant-drawer-title {
          font: var(--font-heading-s);
          color: var(--color-text-primary);
        }
      }
    }
  `,
  body: css`
    &.ant-drawer-body {
      padding: 0 var(--gap-xl) var(--gap-xl);
    }
  `,
}
