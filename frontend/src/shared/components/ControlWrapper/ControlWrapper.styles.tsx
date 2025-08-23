import { css } from "@emotion/react"
import styled from "@emotion/styled"

import { ControlWrapperProps } from "./ControlWrapper.types"

export const Wrapper = styled.div<Pick<ControlWrapperProps, "view" | "formControlStatus" | "size">>`
  --wrapper-font-labell: var(--font-subheading-m);
  --wrapper-font-caption: var(--font-caption-m);
  --wrapper-gap: var(--gap-4xs);

  position: relative;

  display: grid;

  gap: var(--wrapper-gap);

  min-width: 30px;

  &:has(.form-control-caption) {
    padding-bottom: calc(16px + var(--wrapper-gap));
  }

  ${({ view, size }) => {
    if (view === "horizontal") {
      return css`
        grid-template-columns: auto 1fr;

        align-items: center;

        ${{
          s: css`
            --wrapper-font-labell: var(--font-subheading-l);
          `,
          m: css`
            --wrapper-font-labell: var(--font-subheading-l);
          `,
          l: css`
            --wrapper-font-labell: var(--font-subheading-xl);
          `,
        }[size || "m"]}
      `
    }
  }}

  ${({ formControlStatus }) => {
    const status: ControlWrapperProps["formControlStatus"] = formControlStatus || ""

    switch (status) {
      case "success":
        return css`
          ${Caption} {
            color: var(--color-text-success);
          }
        `
      case "error":
        return css`
          ${Caption} {
            color: var(--color-text-error);
          }
        `
      default:
        break
    }
  }}

  ${({ size }) =>
    ({
      s: css`
        --wrapper-font-labell: var(--font-subheading-s);
        --wrapper-font-caption: var(--font-caption-xs);
        --wrapper-gap: var(--gap-5xs);
      `,
      m: css``,
      l: css`
        --wrapper-font-labell: var(--font-subheading-l);
        --wrapper-font-caption: var(--font-caption-3xs);
        --wrapper-gap: var(--gap-3xs);
      `,
    })[size || "m"]}
`
export const Label = styled.div`
  font: var(--wrapper-font-labell);
  color: var(--color-text-primary);
`
export const Required = styled.span`
  margin-right: var(--gap-6xs);

  font: inherit;
  color: var(--color-text-error);
`
export const Caption = styled.div`
  position: absolute;
  top: 100%;
  left: 0;

  max-width: 100%;
  overflow: hidden;

  font: var(--wrapper-font-caption);
  color: var(--color-text-secondary);
  text-overflow: ellipsis;
  white-space: nowrap;

  transform: translateY(-100%);

  &.error {
    color: var(--color-text-error);
  }
`
