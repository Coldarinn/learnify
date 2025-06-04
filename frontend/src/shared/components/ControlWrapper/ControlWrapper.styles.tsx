import { css } from "@emotion/react"
import styled from "@emotion/styled"

import { ControlWrapperProps } from "./ControlWrapper.types"

export const Wrapper = styled.div<Pick<ControlWrapperProps, "formControlStatus" | "size">>`
  position: relative;

  display: grid;

  gap: var(--gap-4xs);

  &:has(.form-control-caption) {
    padding-bottom: calc(16px + var(--gap-4xs));
  }

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
        gap: var(--gap-5xs);

        &:has(.form-control-caption) {
          padding-bottom: calc(12px + var(--gap-5xs));
        }

        ${Label} {
          font: var(--font-subheading-s);
        }
        ${Caption} {
          font: var(--font-caption-xs);
        }
      `,
      m: css``,
      l: css`
        gap: var(--gap-3xs);

        ${Label} {
          font: var(--font-subheading-l);
        }

        &:has(.form-control-caption) {
          padding-bottom: calc(12px + var(--gap-3xs));
        }
      `,
    })[size || "m"]}
`
export const Label = styled.div`
  font: var(--font-subheading-m);
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

  font: var(--font-caption-m);
  color: var(--color-text-secondary);
  text-overflow: ellipsis;
  white-space: nowrap;

  transform: translateY(-100%);

  &.error {
    color: var(--color-text-error);
  }
`
