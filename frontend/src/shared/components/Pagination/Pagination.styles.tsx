import styled from "@emotion/styled"
import Pagination from "antd/es/pagination"

export const StyledPagination = styled(Pagination)`
  &.ant-pagination {
    --ant-pagination-item-bg: none;
    --ant-pagination-item-size: 32px;
    --ant-pagination-item-active-bg: var(--color-surface-base-secondary);
    --ant-pagination-item-link-bg: none;
    --ant-pagination-item-active-color-disabled: var(--color-text-disabled);
    --ant-pagination-item-active-bg-disabled: none;
    --ant-pagination-item-input-bg: var(--color-surface-base-primary);
    --ant-pagination-addon-bg: var(--color-surface-base-primary);
    --ant-pagination-active-border-color: var(--color-border-accent);
    --ant-pagination-hover-border-color: none;
    --ant-pagination-active-shadow: none;
    --ant-pagination-error-active-shadow: none;
    --ant-pagination-warning-active-shadow: none;
    --ant-color-bg-container: var(--color-surface-base-primary);
    --ant-pagination-hover-bg: var(--color-surface-base-primary);
    --ant-pagination-active-bg: var(--color-surface-base-primary);
    --ant-color-border: var(--color-border-secondary);

    --ant-margin-xs: var(--gap-5xs);
    --ant-color-text: var(--color-icon-secondary);
  }

  .ant-pagination-prev svg {
    transform: rotate(90deg);
  }

  .ant-pagination-next svg {
    transform: rotate(-90deg);
  }

  .ant-pagination-prev,
  .ant-pagination-next {
    display: flex;

    flex-shrink: 0;

    align-items: center;
    justify-content: center;

    font-size: 24px;

    transition: var(--ant-motion-duration-mid);

    &:not(.ant-pagination-disabled) {
      &:hover {
        --ant-color-text: var(--color-text-primary);

        background-color: var(--ant-color-bg-text-hover);
      }

      &:active {
        --ant-color-text: var(--color-text-primary);

        background-color: var(--ant-color-bg-text-active);
      }
    }

    &.ant-pagination-disabled {
      color: var(--color-icon-disabled);
    }
  }

  .ant-pagination-item {
    font: var(--font-subheading-l);
    line-height: var(--ant-pagination-item-size);

    &:not(.ant-pagination-disabled) {
      &:hover {
        --ant-color-text: var(--color-text-primary);
      }

      &:active {
        --ant-color-text: var(--color-text-primary);
      }
    }
  }

  .ant-pagination-jump-next,
  .ant-pagination-jump-prev {
    .ant-pagination-item-container .ant-pagination-item-ellipsis {
      color: var(--color-icon-secondary);
      text-indent: 0;
      letter-spacing: 0;
    }
  }

  .ant-pagination-options-size-changer {
    /* it's copied from {Select} component */

    min-height: 24px;
    margin-right: var(--gap-3xs);

    /* styles */
    .ant-select-dropdown {
      --ant-color-bg-elevated: var(--color-surface-base-primary);
      --ant-select-option-selected-bg: var(--color-surface-base-secondary);
    }

    &.ant-select-open .ant-select-selector .ant-select-selection-item {
      color: var(--color-text-secondary);
    }

    .ant-select-selector {
      --ant-select-selector-bg: var(--color-surface-base-primary);
      --ant-color-border: var(--color-border-secondary);

      .ant-select-selection-wrap {
        height: 100%;
      }

      .ant-select-selection-placeholder {
        color: var(--color-text-secondary);
      }

      .ant-select-selection-item {
        color: var(--color-text-primary);
      }

      .ant-select-item-option {
        font: var(--font-body-medium-s);
        font-weight: 500;
        color: var(--color-text-primary);

        &.ant-select-item-option-disabled {
          color: var(--color-text-disabled);
        }
      }

      .ant-select-selection-item,
      .ant-select-selection-search-input,
      .ant-select-selection-placeholder {
        caret-color: var(--color-text-accent);
      }

      &.ant-select-multiple {
        .ant-select-selection-item {
          color: var(--color-text-accent);

          background-color: var(--color-surface-elements-sub-accent);
          border: 1px solid var(--color-border-accent-soft);

          &-remove {
            color: inherit;
          }
        }

        .ant-select-selection-placeholder {
          inset-inline-start: 0;
        }

        .ant-select-selection-search {
          margin-inline-start: 0;
        }
      }

      &.ant-select-dropdown {
        background-color: var(--color-surface-base-primary);
        border: 1px solid var(--color-border-tertiary);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-tooltip);
      }

      &.ant-select-disabled:not(.ant-select-customize-input) .ant-select-selector {
        background-color: var(--color-surface-base-primary);
        border-color: var(--color-border-tertiary);

        .ant-select-selection-placeholder {
          color: var(--color-text-disabled);
        }

        & + .ant-select-arrow {
          color: var(--color-icon-tertiary);
        }
      }
    }

    /* {S} size */
    --ant-font-size-icon: 12px;

    .ant-select-selector {
      padding: 0 var(--gap-3xs);

      border-radius: var(--radius-2xs);
    }

    .ant-select-selection-item,
    .ant-select-selection-search-input,
    .ant-select-selection-placeholder {
      font: var(--font-body-normal-s);
    }

    .ant-select-item-option-content {
      font: var(--font-body-medium-s);
      font-weight: 500;
    }

    &.ant-select-multiple .ant-select-selection-item {
      padding-inline-start: var(--gap-4xs) !important;
      padding-inline-end: var(--gap-4xs) !important;
    }
  }

  .ant-pagination-options-quick-jumper {
    display: inline-flex;

    flex-direction: row-reverse;

    align-items: center;

    margin: 0;

    font-size: 0;

    span,
    input {
      margin-right: 0;

      font: var(--font-body-normal-s);
      color: var(--color-text-primary);
    }
  }
`
