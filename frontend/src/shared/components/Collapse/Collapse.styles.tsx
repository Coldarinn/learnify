import styled from "@emotion/styled"
import Collapse from "antd/es/collapse"

export const StyledCollapse = styled(Collapse)`
  border: none;

  &.ant-collapse {
    --ant-collapse-header-padding: var(--gap-xs) var(--gap-md);
    --ant-collapse-header-bg: var(--color-surface-base-secondary);
    --ant-collapse-content-padding: var(--gap-3xs) var(--gap-md);
    --ant-collapse-content-bg: var(--color-surface-base-primary);
    --ant-border-radius-lg: var(--radius-md);
    --ant-color-border: var(--color-border-tertiary);

    .ant-collapse-header {
      gap: var(--gap-5xs);

      align-items: center;

      &.ant-collapse-collapsible-disabled {
        .ant-collapse-header-text {
          color: var(--color-text-disabled);
        }

        div.ant-collapse-expand-icon {
          color: var(--color-icon-disabled);

          background-color: transparent;
        }
      }

      &:not(.ant-collapse-collapsible-disabled):hover {
        background-color: var(--color-surface-base-secondary-hover);
      }
    }

    .ant-collapse-header-text {
      font: var(--font-subheading-l);
      color: var(--color-text-primary);
    }

    div.ant-collapse-expand-icon {
      --ant-font-height: 32px;
      --ant-margin-sm: 0;
      --ant-font-size-icon: 16px;

      flex-shrink: 0;

      justify-content: center;

      width: var(--ant-font-height);

      background-color: var(--color-surface-base-tertiary);
      border-radius: var(--radius-sm);

      svg {
        color: var(--color-icon-primary);

        transform: rotate(0deg);
      }
    }

    .ant-collapse-item-active {
      .ant-collapse-expand-icon {
        svg {
          transform: rotate(-180deg);
        }
      }
    }
  }
`
