import { Link } from "@/shared/router"
import { Outlet } from "react-router"

import LogoIcon from "@/shared/icons/logo.svg"

import { Bg, Container, Content, Wrapper } from "../styles"
import BgImg from "./bg.png"

export const Layout = () => {
  return (
    <Wrapper>
      <Link className="logo" to="/auth/sign-in">
        <LogoIcon />
      </Link>

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
