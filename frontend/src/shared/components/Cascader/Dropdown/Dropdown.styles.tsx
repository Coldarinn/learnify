import styled from "@emotion/styled"

import { Button as BaseButton } from "@/shared/components/Button"

export const Footer = styled.div`
  display: flex;

  align-items: center;
  justify-content: flex-end;

  width: 100%;
  padding: var(--gap-2xs) var(--gap-xs);

  background-color: var(--color-surface-base-primary);
  border-top: 1px solid var(--color-border-tertiary);
  border-radius: 0 0 var(--radius-sm) var(--radius-sm);
`
export const Button = styled(BaseButton)`
  margin-left: auto;
`
