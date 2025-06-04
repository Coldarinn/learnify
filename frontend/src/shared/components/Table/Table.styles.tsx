import { css } from "@emotion/css"

export const styles = css`
  &.ant-dropdown {
    --ant-table-filter-dropdown-bg: var(--color-surface-base-primary);

    .ant-table-filter-dropdown .ant-table-filter-dropdown-search {
      border: none;

      .ant-table-filter-dropdown-search-input {
        background: none;
        border-color: var(--color-border-primary);
      }
    }

    .ant-dropdown-menu {
      padding: 0;

      border: none;
      border-radius: 0;
      box-shadow: none;
    }

    .ant-table-filter-dropdown-btns {
      border: none;
    }
  }

  .ant-table {
    --ant-table-header-bg: var(--color-surface-base-secondary-hover);
    --ant-table-header-color: var(--color-text-primary);
    --ant-table-row-selected-bg: var(--color-orange-100);
    --ant-table-border-color: var(--color-border-tertiary);
    --ant-table-footer-bg: var(--color-surface-base-secondary-hover);
    --ant-table-footer-color: var(--color-text-primary);
    --ant-table-header-split-color: var(--color-border-secondary);
    --ant-table-header-filter-hover-bg: transparent;
    --ant-table-expand-icon-bg: transparent;
    --ant-table-header-icon-color: var(--color-icon-tertiary);
    --ant-table-header-icon-hover-color: var(--color-icon-secondary);
    --ant-table-header-sort-hover-bg: var(--color-surface-base-secondary);
    --ant-table-header-sort-active-bg: var(--color-surface-base-primary);

    --ant-table-header-border-radius: 0;

    --ant-table-cell-padding-block: var(--gap-3xs);
    --ant-table-cell-padding-inline: var(--gap-3xs);
    --ant-table-selection-column-width: 40px;
    --ant-table-expand-icon-size: 21px;
    --ant-table-expand-icon-margin-top: 0;
    --ant-table-expand-icon-half-inner: 9px;

    .ant-table-row {
      .ant-table-cell {
        font: var(--font-body-normal-s);
        color: var(--color-text-primary);

        background: var(--cell-background);
        box-shadow: var(--shadow-divider-bottom);

        &:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not(
            [colspan]
          )::before {
          height: 50%;
        }

        &.ant-table-cell-row-hover {
          --cell-background: var(--color-surface-base-secondary-hover) !important;
        }
      }

      &:nth-of-type(odd) {
        .ant-table-cell {
          --cell-background: var(--color-surface-base-primary);
        }
      }
      &:nth-of-type(even) {
        .ant-table-cell {
          --cell-background: var(--color-surface-base-secondary);
        }
      }
    }

    .ant-table-column-sorter-full {
      --ant-font-size-icon: 10px;
    }

    .ant-table-filter-trigger {
      font-size: 14px;

      &.active {
        color: var(--color-icon-accent);

        &:hover {
          color: var(--color-icon-accent-hover);
        }
      }
    }

    .ant-table-row-expand-icon {
      --ant-padding-xxs: 6px;

      &:not(:focus) {
        color: var(--color-icon-secondary);
      }

      border-color: currentColor;
    }
  }
`
