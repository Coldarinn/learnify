import { type SerializedStyles, css } from "@emotion/react"
import styled from "@emotion/styled"
import { Badge } from "antd"

import { BadgeProps, colors } from "./Badge.types"

export const StyledBadge = styled(Badge)<BadgeProps>`
  &.ant-badge {
    --ant-badge-indicator-height: auto;
  }

  &.ant-badge.ant-badge-not-a-wrapper .ant-scroll-number {
    height: fit-content;

    box-shadow: none;
  }

  ${badgeStyles}

  &.ant-badge.ant-badge-status .ant-badge-status-text {
    margin-left: var(--gap-5xs);

    font: inherit;
  }
`

function badgeStyles({ bright, color, customColors }: BadgeProps) {
  const { text, background, boxShadow } = resolveBadgeColors(bright, color, customColors)

  return css`
    &.ant-badge.ant-badge-not-a-wrapper .ant-scroll-number,
    &.ant-badge.ant-badge-not-a-wrapper .ant-badge-status-dot {
      color: ${text};
      background: ${background};
      box-shadow: ${boxShadow};
    }
  `
}
const resolveBadgeColors = (bright?: boolean, color?: BadgeProps["color"], customColors?: BadgeProps["customColors"]) => {
  if (customColors) {
    return {
      text: customColors.text ?? "inherit",
      background: customColors.background ?? "transparent",
      boxShadow: customColors.border ? `0 0 0 1px ${customColors.border}` : "unset",
    }
  }

  if (bright) {
    return {
      text: color ? `var(--color-text-${color}-alt)` : "var(--color-text-secondary)",
      background: color ? `var(--color-surface-elements-sub-${color})` : "var(--color-surface-base-tertiary)",
      boxShadow: color ? `0 0 0 1px var(--color-border-${color}-muted)` : "0 0 0 1px var(--color-border-secondary)",
    }
  }

  if (color) {
    const isSystemColor = colors.includes(color)
    return {
      text: isSystemColor ? "var(--color-base-white)" : color,
      background: isSystemColor ? `var(--color-surface-elements-${color})` : color,
      boxShadow: "unset",
    }
  }

  return {
    text: "var(--color-text-primary)",
    background: "var(--color-surface-base-quaternary)",
    boxShadow: "unset",
  }
}

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
      padding: 1px var(--gap-5xs) 3px;

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
      padding: 1px var(--gap-4xs) 3px;

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
