import { css, type SerializedStyles } from "@emotion/react"
import styled from "@emotion/styled"

import { CardProps } from "./Card.types"

export const StyledCard = styled.div`
  display: grid;

  gap: var(--gap-xs);

  padding: var(--gap-md);

  background-color: var(--color-surface-base-primary);
  border: 1px solid var(--color-surface-base-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-alert);

  transition-timing-function: ease-in-out;
  transition-duration: 0.25s;
  transition-property: background-color, border-color;

  &:hover {
    background-color: var(--color-surface-base-primary-hover);
    border-color: var(--color-border-accent);
  }
`
export const Cover = styled.div`
  overflow: hidden;

  border: 1px solid var(--color-border-tertiary);
  border-radius: var(--radius-lg);

  > img {
    width: 100%;
  }
`
export const Tags = styled.div`
  display: flex;

  flex-wrap: wrap;

  row-gap: var(--gap-5xs);

  .ant-tag {
    margin-inline-end: var(--gap-5xs);
  }
`
export const MainContent = styled.div`
  display: grid;

  gap: var(--gap-5xs);
`
export const Date = styled.div`
  font: var(--font-body-medium-s);
  color: var(--color-text-secondary);
`
export const Title = styled.div`
  color: var(--color-text-primary);
`
export const Text = styled.div`
  font: var(--font-body-medium-s);
  color: var(--color-text-primary);
`

export const sizeStyles: Record<NonNullable<CardProps["size"]>, SerializedStyles> = {
  m: css`
    ${Title} {
      font: var(--font-subheading-xl);
    }
  `,
  l: css`
    ${Title} {
      font: var(--font-heading-xs);
    }
  `,
}
