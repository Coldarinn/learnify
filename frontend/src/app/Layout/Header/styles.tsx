import { Link } from "@/shared/router"
import styled from "@emotion/styled"
import Layout from "antd/es/layout"

const { Header } = Layout

export const StyledHeader = styled(Header)`
  &.ant-layout-header {
    --ant-layout-header-height: auto;

    position: sticky;
    top: 0px;
    z-index: 1;

    display: flex;

    gap: var(--gap-xs);

    align-items: center;
    justify-content: space-between;

    width: 100%;
    min-height: 56px;
    padding: var(--gap-xs) var(--gap-md);
    margin-bottom: var(--gap-3xs);

    background-color: var(--color-surface-base-background);
    border-radius: 0 0 var(--radius-md) var(--radius-md);
  }
`
export const Logo = styled(Link)`
  svg {
    height: 50px !important;
    width: auto !important;

    .spark {
      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(3),
      &:nth-child(4) {
        fill: var(--color-orange-400);
      }
      &:nth-child(5),
      &:nth-child(6) {
        fill: var(--color-orange-600);
      }
    }

    .letter {
      fill: var(--color-orange-300);
    }
  }
`
export const Content = styled.div`
  display: flex;

  gap: var(--gap-5xs);

  align-items: center;
`
