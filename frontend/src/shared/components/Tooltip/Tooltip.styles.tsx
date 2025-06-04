import { css } from "@emotion/css"
import styled from "@emotion/styled"

export const TooltipStyles = css`
  &.ant-tooltip {
    --ant-tooltip-arrow-path: path(
      "M11.2333 1.50506C12.095 0.344461 13.9026 0.346067 14.7627 1.50782C17.3673 5.02558 22.3308 11 26 11H0C3.64704 11 8.62172 5.02246 11.2333 1.50506Z"
    );

    border-radius: var(--radius-md);
    box-shadow: none;

    .ant-tooltip-content {
      border-radius: var(--radius-md);
      box-shadow: none;

      .ant-tooltip-inner {
        padding: var(--gap-3xs);

        font: var(--font-subheading-m);
        color: var(--color-text-on-color);

        background-color: var(--color-transparent-dark-900);
        backdrop-filter: blur(2px);
        border-radius: inherit;
        box-shadow: none;
      }
    }

    .ant-tooltip-arrow {
      width: 26px;
      height: 13px;

      &::before {
        bottom: -2px;

        width: 26px;
        height: 13px;

        background-color: var(--color-transparent-dark-900);
      }
      &::after {
        display: none;
      }
    }
  }
`
export const Title = styled.div`
  position: relative;

  display: flex;

  align-items: center;

  min-height: 24px;
  padding-right: 24px;

  button {
    position: absolute;
    top: 0;
    right: 0;
  }
`
