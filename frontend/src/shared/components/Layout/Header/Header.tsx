import { UserMenu } from "@/shared/components/UserMenu"

import { Content, Logo, StyledHeader } from "./Header.styles"
import { HeaderProps } from "./Header.types"
import { Notifications } from "./Notifications"
import { Support } from "./Support"

export const Header = (props: HeaderProps) => {
  const { antProps, logo, support, notifications, userMenu } = props

  return (
    <StyledHeader className="header" {...antProps}>
      <Logo className="header-logo">{logo}</Logo>
      <Content className="header-content">
        {support && <Support {...support} />}
        {notifications && <Notifications {...notifications} />}
        <UserMenu {...userMenu} />
      </Content>
    </StyledHeader>
  )
}
