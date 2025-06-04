import styled from "@emotion/styled"
import Divider from "antd/es/divider"

export const StyledDivider = styled(Divider)`
  &::before,
  &::after {
    border-color: var(--color-border-tertiary) !important;
  }

  &:not(:has(.ant-divider-inner-text)) {
    background-color: var(--color-border-tertiary);
  }

  .ant-divider-inner-text {
    padding: 0 var(--gap-md);

    font: var(--font-body-normal-m);
    color: var(--color-text-primary);
  }

  &.ant-divider-horizontal.ant-divider-with-text-start::before,
  &.ant-divider-horizontal.ant-divider-with-text-end::after {
    width: 21px;
  }
`
