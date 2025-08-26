import LogoIcon from "@/shared/icons/logo.svg"

import { UserMenu } from "./UserMenu"
import { Content, Logo, StyledHeader } from "./styles"

export const Header = () => {
  return (
    <StyledHeader className="header">
      <Logo className="header-logo">
        <LogoIcon />
      </Logo>
      <Content className="header-content">
        <UserMenu />
      </Content>
    </StyledHeader>
  )
}
