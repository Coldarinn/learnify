import { type SerializedStyles, css } from "@emotion/react"
import styled from "@emotion/styled"
import Badge from "antd/es/badge"

import { BadgeProps } from "./Badge.types"

export const StyledBadge = styled(Badge)<BadgeProps>`
  &.ant-badge {
    --ant-badge-indicator-height: auto;
  }

  &.ant-badge.ant-badge-not-a-wrapper .ant-scroll-number {
    height: fit-content;

    box-shadow: none;
  }

  &.ant-badge.ant-badge-not-a-wrapper .ant-scroll-number,
  &.ant-badge.ant-badge-not-a-wrapper .ant-badge-status-dot {
    ${({ bright }) => css`
      color: var(--color-text-secondary);

      background: ${bright ? "var(--color-surface-base-secondary)" : "var(--color-surface-base-quaternary)"};

      &.ant-badge-color-red {
        color: ${bright ? "var(--color-text-error)" : "var(--color-base-white)"};

        background: ${bright ? "var(--color-surface-elements-sub-critical)" : "var(--color-surface-elements-critical)"};
      }
      &.ant-badge-color-green {
        color: ${bright ? "var(--color-text-success)" : "var(--color-base-white)"};

        background: ${bright ? "var(--color-surface-elements-sub-success)" : "var(--color-surface-elements-success)"};
      }
      &.ant-badge-color-blue {
        color: ${bright ? "var(--color-text-info)" : "var(--color-base-white)"};

        background: ${bright ? "var(--color-surface-elements-sub-info)" : "var(--color-surface-elements-info)"};
      }
      &.ant-badge-color-yellow {
        color: ${bright ? "var(--color-text-warning)" : "var(--color-base-white)"};

        background: ${bright ? "var(--color-surface-elements-sub-warning)" : "var(--color-surface-elements-warning)"};
      }
      &.ant-badge-color-orange {
        color: ${bright ? "var(--color-text-accent)" : "var(--color-base-white)"};

        background: ${bright ? "var(--color-surface-elements-sub-accent)" : "var(--color-surface-elements-accent)"};
      }
    `}
  }

  &.ant-badge.ant-badge-status .ant-badge-status-text {
    margin-left: var(--gap-5xs);

    font: inherit;
  }
`

export const sizeStyles: Record<NonNullable<BadgeProps["size"]>, SerializedStyles> = {
  s: css`
    &.ant-badge.ant-badge-status {
      font: var(--font-subheading-m);

      .ant-badge-status-dot {
        width: 8px;
        height: 8px;
      }
    }

    .ant-badge-count {
      padding: var(--gap-6xs) var(--gap-5xs);

      font: var(--font-subheading-xs);

      border-radius: var(--radius-3xl);
    }
  `,
  m: css`
    &.ant-badge.ant-badge-status {
      font: var(--font-subheading-l);

      .ant-badge-status-dot {
        width: 10px;
        height: 10px;
      }
    }

    .ant-badge-count {
      padding: var(--gap-6xs) var(--gap-4xs) var(--gap-5xs);

      font: var(--font-subheading-s);

      border-radius: var(--radius-3xl);
    }
  `,
  l: css`
    &.ant-badge.ant-badge-status {
      font: var(--font-subheading-l);

      .ant-badge-status-dot {
        width: 10px;
        height: 10px;
      }
    }

    .ant-badge-count {
      padding: var(--gap-5xs) var(--gap-3xs);

      font: var(--font-subheading-m);

      border-radius: var(--radius-3xl);
    }
  `,
}
