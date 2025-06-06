import { Outlet } from "react-router"

import { Container, Wrapper } from "../styles"

export const Layout = () => {
  return (
    <Wrapper>
      <Container>
        <Outlet />
      </Container>
    </Wrapper>
  )
}
