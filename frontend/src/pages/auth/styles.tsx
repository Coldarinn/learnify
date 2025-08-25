import styled from "@emotion/styled"

import { Button as BaseButton } from "@/shared/components/Button"
import { Divider as BaseDivider } from "@/shared/components/Divider"

export const Wrapper = styled.div`
  height: 100dvh;

  display: flex;
  align-items: center;
  justify-content: center;

  background: radial-gradient(58.43% 103.88% at 56.74% 50%, var(--color-surface-base-quaternary) 0%, var(--color-surface-base-primary-hover) 100%);
  box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.1);

  position: relative;

  > img {
    position: absolute;
    left: 0;
    top: 0;

    width: 100%;
    height: 100%;
    object-fit: cover;

    mix-blend-mode: luminosity;
  }

  .oauth-loader {
    position: fixed;
  }
`
export const Container = styled.section`
  width: 100%;
  max-width: 600px;
  max-height: 100%;
  height: fit-content;
  padding: var(--gap-3xl) var(--gap-4xl);

  border-radius: var(--radius-xl);
  border: 2px solid var(--color-surface-base-quaternary);

  position: relative;
  z-index: 1;
`
export const Bg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: var(--color-surface-base-tertiary);
  backdrop-filter: blur(9px);
  box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.4);

  opacity: 0.6;
  border-radius: inherit;
`
export const Content = styled.div`
  display: grid;
  gap: var(--gap-xl);

  position: relative;
  z-index: 1;

  .ant-input-affix-wrapper.custom-input {
    background: transparent !important;
  }
`
export const Title = styled.h1`
  font: var(--font-heading-m);
  font-weight: 600;

  text-align: center;
`
export const Divider = styled(BaseDivider)`
  margin: 0 !important;
`
export const OAuth = styled.div`
  display: flex;
  gap: var(--gap-md);
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
