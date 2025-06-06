import styled from "@emotion/styled"

import { Button as BaseButton, Divider as BaseDivider } from "@/shared/components"

export const Wrapper = styled.div`
  height: 100dvh;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const Container = styled.section`
  width: 100%;
  max-width: 400px;
  max-height: 100%;
  height: fit-content;
  padding: var(--gap-xl);

  display: grid;
  gap: var(--gap-xl);

  border-radius: var(--radius-lg);

  background: var(--color-surface-base-primary);
`
export const Title = styled.h1`
  font: var(--font-heading-m);
  font-weight: 600;

  text-align: center;
`
export const Divider = styled(BaseDivider)`
  margin: 0 !important;
`
export const Button = styled(BaseButton)`
  width: 100%;

  font-weight: 600;
`
export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--gap-5xs);

  font: var(--font-caption-m);

  a {
    text-decoration: underline;
    color: var(--color-text-accent);
  }
`
