import { css } from "@emotion/css"

export const StyledModal = css`
  &.ant-modal-root {
    --ant-color-bg-mask: var(--color-transparent-dark-400);
    --ant-modal-content-padding: var(--gap-xl);
    --ant-modal-content-bg: var(--color-surface-base-primary);
    --ant-modal-header-bg: none;
    --ant-box-shadow: var(--shadow-alert);
    --ant-modal-header-margin-bottom: var(--gap-xs);
    --ant-modal-title-color: var(--color-text-primary);
    --ant-modal-footer-margin-top: var(--gap-md);
  }

  .ant-modal-mask {
    backdrop-filter: blur(1px);
  }

  .ant-modal {
    padding: var(--gap-xl) 0 !important;
  }

  .ant-modal-close {
    --ant-color-bg-text-hover: none;
    --ant-color-bg-text-active: none;
  }

  .ant-modal-title {
    font: var(--font-heading-xs);
  }
`
