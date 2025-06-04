import { css, type SerializedStyles } from "@emotion/react"
import styled from "@emotion/styled"
import Tag from "antd/es/tag"

import { TagProps } from "./Tag.types"

export const StyledTag = styled(Tag)`
  color: var(--color-text-secondary);

  background-color: var(--color-surface-base-secondary);
  border-color: var(--color-border-secondary);

  &.ant-tag-green {
    color: var(--color-text-success);

    background-color: var(--color-surface-elements-sub-success);
    border-color: var(--color-border-success-soft);
  }
  &.ant-tag-red {
    color: var(--color-text-error);

    background-color: var(--color-surface-elements-sub-critical);
    border-color: var(--color-border-critical-soft);
  }
  &.ant-tag-orange {
    color: var(--color-text-accent);

    background-color: var(--color-surface-elements-sub-accent);
    border-color: var(--color-border-accent-soft);
  }
  &.ant-tag-blue {
    color: var(--color-text-info);

    background-color: var(--color-surface-elements-sub-info);
    border-color: var(--color-border-info-soft);
  }

  &:last-child {
    margin-right: 0;
  }
`

export const sizeStyles: Record<NonNullable<TagProps["size"]>, SerializedStyles> = {
  xs: css`
    padding: var(--gap-6xs) var(--gap-4xs);

    font: var(--font-subheading-xs);

    border-radius: var(--radius-3xs);
  `,
  s: css`
    padding: var(--gap-6xs) var(--gap-3xs);

    font: var(--font-subheading-s);

    border-radius: var(--radius-3xs);
  `,
  m: css`
    padding: var(--gap-5xs) var(--gap-3xs);

    font: var(--font-subheading-m);

    border-radius: var(--radius-2xs);
  `,
  l: css`
    padding: var(--gap-4xs) var(--gap-xs);

    font: var(--font-subheading-l);

    border-radius: var(--radius-xs);
  `,
}
