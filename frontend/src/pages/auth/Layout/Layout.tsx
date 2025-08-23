import { Outlet } from "react-router"

import { Bg, Container, Content, Wrapper } from "../auth.styles"
import BgImg from "./bg.svg"

export const Layout = () => {
  return (
    <Wrapper>
      <Container>
        <Content>
          <Outlet />
        </Content>
        <Bg />
      </Container>
      <BgImg />
    </Wrapper>
  )
}
