import { UserMenu } from "@/shared/components/UserMenu"

import { Notifications } from "./Notifications"
import { Support } from "./Support"
import LogoIcon from "./logo.svg"
import { Content, Logo, StyledHeader } from "./styles"
import { HeaderProps } from "./types"

export const Header = (props: HeaderProps) => {
  const { antProps, support, notifications, userMenu } = props

  return (
    <StyledHeader className="header" {...antProps}>
      <Logo className="header-logo">
        <LogoIcon />
      </Logo>
      <Content className="header-content">
        {support && <Support {...support} />}
        {notifications && <Notifications {...notifications} />}
        <UserMenu {...userMenu} />
      </Content>
    </StyledHeader>
  )
}
