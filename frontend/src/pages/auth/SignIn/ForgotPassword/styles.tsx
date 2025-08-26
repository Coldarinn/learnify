import { css } from "@emotion/css"
import styled from "@emotion/styled"

export const Button = styled.button`
  display: block;
  margin: 0 auto;

  text-decoration: underline;
  color: var(--color-text-accent);
  font: var(--font-caption-m);
`
export const Text = styled.p`
  margin-bottom: var(--gap-lg);

  color: var(--color-text-secondary);
  font: var(--font-caption-l);
`
export const ModalStyles = css`
  .ant-modal-content {
    background: var(--color-surface-base-tertiary);
    box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.4);
  }

  .custom-input {
    background: transparent !important;
  }
`
