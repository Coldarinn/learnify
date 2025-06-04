import { css } from "@emotion/css"
import { css as emotionCss } from "@emotion/react"
import styled from "@emotion/styled"

import { Button } from "@/shared/components/Button"
import { ControlWrapper, ControlWrapperProps } from "@/shared/components/ControlWrapper"

export const Wrapper = styled(ControlWrapper)`
  width: 100%;

  ${({ formControlStatus }) => {
    const formStatus: ControlWrapperProps["formControlStatus"] = formControlStatus || ""

    switch (formStatus) {
      case "success":
        return emotionCss`
          ${CascaderStyles}.ant-select {
            border-color: var(--color-border-success);
          }
        `
      case "error":
        return emotionCss`
          ${CascaderStyles}.ant-select {
            border-color: var(--color-border-critical);
          }
        `
      default:
        break
    }
  }}
`
export const CascaderStyles = css`
  &.ant-select {
    width: 100%;
    height: 32px;

    .ant-select-arrow {
      font-size: 16px;
    }

    .ant-select-clear {
      background: var(--color-surface-base-page);

      svg {
        color: var(--color-icon-secondary);
      }
    }

    &:not(.ant-select-customize-input) .ant-select-selector {
      background: transparent;
      border-color: var(--color-border-primary);
    }

    .ant-select-selection-placeholder {
      font: var(--font-subheading-m);
      color: var(--color-text-secondary);
    }

    .ant-select-selection-search-input {
      font: var(--font-subheading-m);
      color: var(--color-text-primary);
    }

    &.ant-select-disabled {
      .ant-select-selector {
        background-color: var(--color-surface-base-primary);
        border-color: var(--color-border-tertiary);
      }

      .ant-select-selection-placeholder {
        color: var(--color-text-disabled);
      }
    }
  }

  &.ant-select-dropdown {
    background-color: var(--color-surface-base-primary);
    border: 1px solid var(--color-border-tertiary);
    box-shadow: var(--shadow-alert);

    .ant-cascader-menu {
      padding: 0;
    }

    .ant-cascader-menu-item {
      --ant-color-text-description: var(--color-icon-primary);
      --ant-font-size-icon: 16px;

      font: var(--font-body-medium-m);
      color: var(--color-text-primary);

      .ant-cascader-menu-item-expand-icon {
        height: var(--ant-font-size-icon);

        svg {
          transform: rotate(-90deg);
        }
      }

      &.ant-cascader-menu-item-active {
        --ant-color-text-description: var(--color-icon-accent);
        color: var(--color-text-accent);

        background-color: var(--color-surface-elements-sub-accent);
      }

      &:hover {
        font-weight: 500;

        background-color: var(--color-surface-elements-sub-accent-hover);
      }

      &:has(.ant-cascader-checkbox-disabled) {
        --ant-color-text-description: var(--color-icon-disabled);
        color: var(--color-text-disabled);

        cursor: not-allowed;
      }
    }

    .ant-cascader-checkbox {
      .ant-cascader-checkbox-inner {
        width: 20px;
        height: 20px;

        background-color: transparent !important;
        background-image: url("data:image/svg+xml,%3Csvg%20width='21'%20height='21'%20viewBox='0%200%2021%2021'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M10.1966%200.25H10.3034C12.4507%200.249988%2014.1335%200.249979%2015.4466%200.426509C16.7905%200.607197%2017.851%200.984257%2018.6834%201.81664C19.5157%202.64902%2019.8928%203.70951%2020.0735%205.05345C20.25%206.36646%2020.25%208.04929%2020.25%2010.1966V10.3034C20.25%2012.4507%2020.25%2014.1335%2020.0735%2015.4466C19.8928%2016.7905%2019.5157%2017.851%2018.6834%2018.6834C17.851%2019.5157%2016.7905%2019.8928%2015.4466%2020.0735C14.1335%2020.25%2012.4507%2020.25%2010.3034%2020.25H10.1966C8.04929%2020.25%206.36646%2020.25%205.05345%2020.0735C3.70951%2019.8928%202.64902%2019.5157%201.81664%2018.6834C0.984257%2017.851%200.607197%2016.7905%200.426509%2015.4466C0.249979%2014.1335%200.249988%2012.4507%200.25%2010.3034V10.1966C0.249988%208.04928%200.249979%206.36646%200.426509%205.05345C0.607197%203.70951%200.984257%202.64902%201.81664%201.81664C2.64902%200.984257%203.70951%200.607197%205.05345%200.426509C6.36646%200.249979%208.04928%200.249988%2010.1966%200.25ZM5.23937%201.80941C4.05016%201.9693%203.33321%202.27339%202.8033%202.8033C2.27339%203.33321%201.9693%204.05016%201.80941%205.23937C1.64683%206.44866%201.64535%208.0377%201.64535%2010.25C1.64535%2012.4623%201.64683%2014.0513%201.80941%2015.2606C1.9693%2016.4498%202.27339%2017.1668%202.8033%2017.6967C3.33321%2018.2266%204.05016%2018.5307%205.23937%2018.6906C6.44866%2018.8532%208.0377%2018.8547%2010.25%2018.8547C12.4623%2018.8547%2014.0513%2018.8532%2015.2606%2018.6906C16.4498%2018.5307%2017.1668%2018.2266%2017.6967%2017.6967C18.2266%2017.1668%2018.5307%2016.4498%2018.6906%2015.2606C18.8532%2014.0513%2018.8547%2012.4623%2018.8547%2010.25C18.8547%208.0377%2018.8532%206.44866%2018.6906%205.23937C18.5307%204.05016%2018.2266%203.33321%2017.6967%202.8033C17.1668%202.27339%2016.4498%201.9693%2015.2606%201.80941C14.0513%201.64683%2012.4623%201.64535%2010.25%201.64535C8.0377%201.64535%206.44866%201.64683%205.23937%201.80941Z'%20fill='%238C8C8C'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        border: none;

        &::after {
          display: none;
        }
      }
      &.ant-cascader-checkbox-checked .ant-cascader-checkbox-inner {
        background-image: url("data:image/svg+xml,%3Csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M10%2020C5.28595%2020%202.92893%2020%201.46447%2018.5355C0%2017.0711%200%2014.714%200%2010C0%205.28595%200%202.92893%201.46447%201.46447C2.92893%200%205.28595%200%2010%200C14.714%200%2017.0711%200%2018.5355%201.46447C20%202.92893%2020%205.28595%2020%2010C20%2014.714%2020%2017.0711%2018.5355%2018.5355C17.0711%2020%2014.714%2020%2010%2020ZM14.0303%206.96967C14.3232%207.26256%2014.3232%207.73744%2014.0303%208.03033L9.03033%2013.0303C8.73744%2013.3232%208.26256%2013.3232%207.96967%2013.0303L5.96967%2011.0303C5.67678%2010.7374%205.67678%2010.2626%205.96967%209.96967C6.26256%209.67678%206.73744%209.67678%207.03033%209.96967L8.5%2011.4393L12.9697%206.96967C13.2626%206.67678%2013.7374%206.67678%2014.0303%206.96967Z'%20fill='%23F76818'/%3E%3C/svg%3E");
      }
      &.ant-cascader-checkbox-indeterminate .ant-cascader-checkbox-inner {
        background-image: url("data:image/svg+xml,%3Csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M10%2020C5.28595%2020%202.92893%2020%201.46447%2018.5355C0%2017.0711%200%2014.714%200%2010C0%205.28595%200%202.92893%201.46447%201.46447C2.92893%200%205.28595%200%2010%200C14.714%200%2017.0711%200%2018.5355%201.46447C20%202.92893%2020%205.28595%2020%2010C20%2014.714%2020%2017.0711%2018.5355%2018.5355C17.0711%2020%2014.714%2020%2010%2020ZM13.75%2010C13.75%2010.4142%2013.4142%2010.75%2013%2010.75H7C6.58579%2010.75%206.25%2010.4142%206.25%2010C6.25%209.58579%206.58579%209.25%207%209.25H13C13.4142%209.25%2013.75%209.58579%2013.75%2010Z'%20fill='%23F76818'/%3E%3C/svg%3E");
      }
    }
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
  }
`
export const StyledButton = styled(Button)`
  .ant-btn-icon {
    font-size: 16px;
  }
`
