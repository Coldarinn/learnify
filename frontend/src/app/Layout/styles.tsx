import styled from "@emotion/styled"
import Layout from "antd/es/layout"
import Menu from "antd/es/menu"

const { Content, Sider } = Layout

export const StyledLayout = styled(Layout)`
  height: 100svh;

  background-color: var(--color-surface-base-page);

  svg {
    width: 1em;
    height: 1em;

    fill: currentColor;
  }
`
export const StyledSider = styled(Sider)`
  --ant-menu-collapsed-icon-size: 16px;

  --wrapper-margin: 8px;

  &.ant-layout-sider {
    background: var(--color-surface-base-background);
    border-radius: 0 var(--radius-lg) var(--radius-lg) 0;

    .ant-menu {
      padding: var(--gap-3xs) 0;
    }

    .ant-layout-sider-children {
      overflow: auto;

      background: inherit;
      border-radius: inherit;

      &::-webkit-scrollbar {
        width: 4px;
        height: 4px;
      }
    }

    .ant-layout-sider-trigger {
      position: sticky;
      bottom: 0;
      z-index: 1;

      background: none;
    }

    &.ant-layout-sider-collapsed {
      .sider-go-back {
        button {
          gap: 0;

          padding-right: calc(50% - calc(14px / 2));
          padding-left: calc(50% - calc(14px / 2));

          span {
            font-size: 0;
          }
        }
      }

      .ant-layout-sider-trigger {
        .sider-collapse-trigger {
          gap: 0;

          padding: 0 calc(50% - calc(var(--ant-menu-collapsed-icon-size) / 2));
          overflow: hidden;
        }

        svg {
          transform: scale(1);
        }

        span {
          font-size: 0;
        }
      }
    }
  }
`
export const CollapseTrigger = styled.div`
  display: flex;

  gap: var(--gap-5xs);

  align-items: center;
  justify-content: flex-start;

  height: 48px;
  padding-left: var(--gap-md);

  transition: var(--ant-motion-duration-mid);

  svg {
    flex-shrink: 0;

    width: var(--ant-menu-collapsed-icon-size);
    height: var(--ant-menu-collapsed-icon-size);

    fill: var(--color-icon-tertiary);

    transform: scale(-1);
  }

  span {
    font: var(--font-subheading-s);
    color: var(--color-text-secondary);
    white-space: nowrap;

    transition: var(--ant-motion-duration-mid);
  }
`
export const StyledMenu = styled(Menu)`
  &.ant-menu {
    --ant-menu-item-margin-block: var(--wrapper-margin);
    --ant-menu-item-margin-inline: var(--wrapper-margin);
    --ant-menu-item-padding-inline: var(--gap-xs);
    --ant-menu-item-width: calc(100% - var(--wrapper-margin) * 2);
    --ant-menu-item-bg: inherit;
    --ant-menu-item-color: var(--color-text-secondary);
    --ant-menu-item-hover-bg: none;
    --ant-menu-sub-menu-item-bg: none;
    --ant-menu-item-hover-color: var(--color-text-accent-hover);
    --ant-menu-item-selected-bg: var(--color-surface-base-secondary);
    --ant-menu-item-selected-color: var(--color-text-accent);
    --ant-menu-item-active-bg: var(--color-surface-base-secondary-pressed);
    --ant-menu-item-active-color: var(--color-text-secondary);

    --ant-menu-icon-size: 24px;

    --ant-menu-active-bar-border-width: 0;

    &.ant-menu-inline-collapsed {
      --ant-menu-icon-size: var(--ant-menu-collapsed-icon-size);
    }
  }

  .ant-menu-item,
  .ant-menu-submenu-title {
    margin-top: 0;
    margin-bottom: 0;

    font: var(--font-subheading-m);
    line-height: var(--ant-menu-item-height);
  }
`
export const StyledContent = styled(Content)`
  &.ant-layout-content {
    padding: var(--gap-xl);
    margin-left: var(--gap-3xs);
    overflow: auto;

    background: var(--color-surface-base-background);
    border-radius: var(--radius-md) var(--radius-md) 0 var(--radius-md);
  }
`
