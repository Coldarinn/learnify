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

    background-color: var(--color-surface-base-primary);
    border-radius: 0 0 var(--radius-md) var(--radius-md);
  }
`
export const Logo = styled.div``
export const Content = styled.div`
  display: flex;

  gap: var(--gap-5xs);

  align-items: center;
`
