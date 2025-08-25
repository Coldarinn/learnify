import { Outlet } from "react-router"

import { Bg, Container, Content, Wrapper } from "../styles"
import BgImg from "./bg.png"

export const Layout = () => {
  return (
    <Wrapper>
      <Container>
        <Content>
          <Outlet />
        </Content>
        <Bg />
      </Container>
      <img src={BgImg} />
    </Wrapper>
  )
}
