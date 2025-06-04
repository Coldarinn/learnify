import { css } from "@emotion/css"
import styled from "@emotion/styled"

import { Button } from "@/shared/components/Button"

export const Wrapper = styled.div`
  display: flex;

  gap: var(--gap-md);
`
export const StyledForm = css`
  width: 100%;

  .comment-form-upload-button {
    position: absolute;
    top: var(--gap-sm);
    right: var(--gap-sm);

    .ant-upload.ant-upload-select {
      line-height: 0;
    }
  }

  .ant-upload-wrapper .ant-upload-drag {
    background: none;
    border: none;
    outline: 1px solid transparent;
    outline-style: dashed;
    outline-offset: 2px;

    transition: outline-color 0.2s ease-in-out;

    &.ant-upload-drag-hover {
      outline-color: var(--color-border-accent);
    }

    .ant-upload-drag-container {
      vertical-align: top;
    }

    .ant-upload {
      padding: 0;
    }
  }
`
export const FormControls = styled.div`
  display: flex;

  flex-direction: column;

  align-items: flex-end;

  width: 100%;

  cursor: default;
`
export const TextAreaWrapper = styled.div`
  position: relative;

  width: 100%;

  .custom-text-area {
    height: 106px;
  }
`
export const PaperclipBtn = styled.button`
  font-size: 20px;
  line-height: 1rem;
  color: var(--color-icon-secondary);
`
export const CharsCount = styled.div`
  margin: var(--gap-3xs) 0 var(--gap-xs);

  font: var(--font-caption-m);
  color: var(--color-text-secondary);
`
export const Footer = styled.div`
  display: flex;

  gap: var(--gap-md);

  align-items: flex-start;
  justify-content: space-between;

  width: 100%;
`
export const SubmitBtn = styled(Button)`
  flex-shrink: 0;
`
