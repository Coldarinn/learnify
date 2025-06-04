import { css } from "@emotion/css"
import { css as emotionCss } from "@emotion/react"
import styled from "@emotion/styled"

import { ControlWrapper } from "@/shared/components/ControlWrapper"

import { DatePickerProps } from "./DatePicker.types"

export const Wrapper = styled(ControlWrapper)<Pick<DatePickerProps, "status">>`
  ${({ status }) =>
    ({
      success: emotionCss`
        .ant-picker {
          border-color: var(--color-border-success);
        }
      `,
      error: emotionCss`
        .ant-picker {
          border-color: var(--color-border-critical);
        }
      `,
      "": "",
    })[status || ""]}
`
export const DatePickerStyles = css`
  &.ant-picker {
    padding: calc(var(--gap-4xs) - 1px) var(--gap-2xs);

    font: var(--font-caption-m);
    color: var(--color-text-primary);

    background-color: var(--color-surface-base-primary);
    border-color: var(--color-border-secondary);
    border-radius: var(--radius-xs);

    &.ant-picker-disabled {
      background-color: var(--color-surface-base-primary);
      border-color: var(--color-border-tertiary);

      .ant-picker-prefix {
        color: var(--color-icon-disabled);
      }

      .ant-picker-input input {
        color: var(--color-text-disabled);

        &::placeholder {
          color: var(--color-text-disabled);
        }
      }

      &:hover {
        background-color: var(--color-surface-base-primary);
        border-color: var(--color-border-tertiary);
      }
    }

    &:not(.ant-picker-disabled) {
      &:focus,
      &:focus-within {
        caret-color: var(--color-border-accent);

        border-color: var(--color-border-accent);
      }

      &:hover:not(:focus):not(:focus-within) {
        border-color: var(--color-border-primary);

        .ant-picker-input input {
          &::placeholder {
            color: var(--color-text-secondary);
          }
        }
      }

      &.ant-picker-status-error,
      &.ant-picker-status-success {
        .ant-picker-prefix {
          color: var(--color-icon-tertiary);
        }
      }
    }

    .ant-picker-prefix {
      margin-inline-end: var(--gap-4xs);

      font-size: 20px;
      line-height: 0;
      color: var(--color-icon-tertiary);
    }

    .ant-picker-input {
      input {
        font: var(--font-body-normal-s);
        color: var(--color-text-primary);

        transition: all var(--ant-motion-duration-mid) var(--ant-motion-ease-in-out);

        &::placeholder {
          color: var(--color-text-tertiary);

          transition: all var(--ant-motion-duration-mid) var(--ant-motion-ease-in-out);
        }

        &:focus::placeholder {
          color: var(--color-text-secondary);
        }
      }

      &.ant-picker-input-placeholder input {
        color: var(--color-text-tertiary);
      }
    }

    .ant-picker-active-bar {
      display: none;
    }

    &.ant-picker-small {
      padding: calc(var(--gap-6xs) - 1px) var(--gap-3xs);

      font: var(--font-body-normal-s);

      border-radius: var(--radius-2xs);

      .ant-picker-prefix {
        margin-inline-end: var(--gap-5xs);

        font-size: 14px;
      }
    }
    &.ant-picker-large {
      padding: var(--gap-xs) var(--gap-sm);

      font: var(--font-body-normal-m);

      border-radius: var(--radius-md);
    }
  }

  &.ant-picker-range {
    .ant-picker-input {
      width: fit-content;

      input {
        width: fit-content;
        min-width: 10.3ch;
        max-width: 100%;
      }
    }
  }

  &.ant-picker-dropdown {
    --ant-date-picker-cell-width: 32px;
    --ant-date-picker-cell-height: 32px;

    &:not(.ant-picker-dropdown-range) {
      .ant-picker-panel-container {
        min-width: 100%;
      }

      .ant-picker-panel-layout > div {
        min-width: 100%;

        .ant-picker-panel,
        .ant-picker-week-panel,
        .ant-picker-quarter-panel,
        .ant-picker-date-panel {
          min-width: 100%;
        }
      }
    }

    .ant-picker-range-arrow {
      display: none;
    }

    .ant-picker-panels {
      gap: var(--gap-xs);
    }

    .ant-picker-panel-container {
      overflow: visible;

      background: unset;
      border-radius: unset;
      box-shadow: unset;
    }
    .ant-picker-panel {
      background-color: var(--color-surface-base-primary);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-tooltip);
    }

    .ant-picker-body {
      padding: var(--gap-3xs) var(--gap-5xs);
    }

    .ant-picker-header-view {
      font: var(--font-subheading-m);
      color: var(--color-text-accent);

      .ant-picker-month-btn {
        text-transform: capitalize;
      }
    }

    .ant-picker-content thead th {
      height: var(--ant-date-picker-cell-height);

      font: var(--font-caption-m);
      color: var(--color-text-secondary);
    }

    .ant-picker-cell {
      --radius-circle: calc(var(--ant-date-picker-cell-height) / 2);

      /* default cells */
      .ant-picker-cell-inner {
        font: var(--font-caption-m);
        line-height: var(--ant-date-picker-cell-height);
        color: var(--color-text-primary);

        border-radius: var(--radius-circle);

        &:before {
          border: none;
        }
      }

      /* current day cell */
      &.ant-picker-cell-today {
        .ant-picker-cell-inner {
          color: var(--color-text-accent);

          background-color: var(--color-surface-elements-sub-accent);
        }
      }

      /* prev and next pages cells */
      &:not(.ant-picker-cell-in-view) {
        .ant-picker-cell-inner {
          color: var(--color-text-disabled);
        }
      }

      /* hover and selected cells */
      &:hover,
      &.ant-picker-cell-hover,
      &.ant-picker-cell-selected,
      &.ant-picker-cell-range-start,
      &.ant-picker-cell-range-end {
        &:not(.ant-picker-cell-disabled) {
          .ant-picker-cell-inner {
            color: var(--color-base-white) !important;

            background-color: var(--color-surface-elements-accent) !important;
            border-radius: var(--radius-circle);
          }
        }
      }

      /* selected cells and cells in range before bgc */
      &.ant-picker-cell-range-start,
      &.ant-picker-cell-range-end,
      &.ant-picker-cell-in-range {
        &:before {
          background-color: var(--color-icon-disabled);
        }
      }

      /* cells in range color */
      &.ant-picker-cell-in-range {
        .ant-picker-cell-inner {
          color: var(--color-text-primary);
        }
      }

      /* fix before of cells in range but not in view */
      &.ant-picker-cell-range-start,
      &:first-of-type {
        &:before {
          inset-inline-start: calc((100% - var(--ant-date-picker-cell-width)) / 2);

          border-radius: var(--radius-circle) 0 0 var(--radius-circle);
        }
        &.ant-picker-cell-range-end:before {
          inset-inline-end: calc((100% - var(--ant-date-picker-cell-width)) / 2);

          border-radius: var(--radius-circle);
        }
      }
      &.ant-picker-cell-range-end,
      &:last-of-type {
        &:before {
          inset-inline-end: calc((100% - var(--ant-date-picker-cell-width)) / 2);

          border-radius: 0 var(--radius-circle) var(--radius-circle) 0;
        }
        &.ant-picker-cell-range-start:before {
          inset-inline-end: calc((100% - var(--ant-date-picker-cell-width)) / 2);

          border-radius: var(--radius-circle);
        }
      }
    }

    .ant-picker-month-panel,
    .ant-picker-year-panel,
    .ant-picker-decade-panel {
      --ant-date-picker-cell-width: 78px;
      --ant-date-picker-cell-height: 40px;

      width: calc(var(--ant-date-picker-cell-width) * 3 + calc(var(--ant-padding) + var(--ant-padding-xxs) / 2) * 2);
      min-width: 100%;

      .ant-picker-header-view {
        line-height: var(--ant-date-picker-cell-height);
      }

      .ant-picker-body {
        padding: 0 var(--gap-xs);
      }

      .ant-picker-content {
        height: calc(var(--ant-date-picker-cell-height) * 4 + var(--gap-xl) * 3);
      }

      .ant-picker-cell {
        padding: 0;

        .ant-picker-cell-inner {
          width: 100%;
          height: var(--ant-date-picker-cell-height);

          font: var(--font-subheading-m);
          line-height: var(--ant-date-picker-cell-height);
          text-transform: capitalize;

          border-radius: var(--radius-lg) !important;
        }
      }
    }

    .ant-picker-decade-panel {
      .ant-picker-cell .ant-picker-cell-inner {
        overflow: hidden;

        font: var(--font-caption-xs);
        line-height: var(--ant-date-picker-cell-height);
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
`
