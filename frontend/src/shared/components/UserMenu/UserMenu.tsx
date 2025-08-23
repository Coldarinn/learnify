import { Avatar } from "@/shared/components/Avatar"
import { Button } from "@/shared/components/Button"
import { Popover } from "@/shared/components/Popover"

import LogoutIcon from "@/shared/icons/arrow-logout-2.svg"
import CopyIcon from "@/shared/icons/copy.svg"

import { AvatarButton, Email, Header, LogoutButton, Name, StyledDivider } from "./UserMenu.styles"
import { UserMenuProps } from "./UserMenu.types"

type UserMenuContentProps = Pick<UserMenuProps, "avatarUrl" | "name" | "email" | "onLogout" | "extraContent">
const UserMenuContent = (props: UserMenuContentProps) => {
  const { avatarUrl = "", name = "", email = "", onLogout, extraContent } = props

  return (
    <>
      <Header className="user-menu-header">
        <Avatar className="user-menu-avatar" src={avatarUrl} size="large" alt="Аватар профиля" />
        <div className="user-menu-info">
          {name && <Name className="user-menu-name">{name}</Name>}
          {email && (
            <Email className="user-menu-email">
              <span>{email}</span>
              <Button size="xs" type="link-secondary" icon={<CopyIcon />} onClick={() => navigator.clipboard.writeText(email)} />
            </Email>
          )}
        </div>
      </Header>
      <StyledDivider className="user-menu-divider" />
      {extraContent}
      <LogoutButton className="user-menu-logout" onClick={onLogout}>
        <LogoutIcon />
        <span>Выйти из профиля</span>
      </LogoutButton>
    </>
  )
}

export const UserMenu = (props: UserMenuProps) => {
  const { avatarUrl = "", name = "", email = "", onLogout, extraContent, ...otherProps } = props

  const contentProps: UserMenuContentProps = {
    avatarUrl,
    name,
    email,
    onLogout,
    extraContent,
  }

  return (
    <Popover placement="bottomRight" {...otherProps} content={<UserMenuContent {...contentProps} />}>
      <AvatarButton className="user-menu-button" type="button">
        <Avatar className="user-menu-avatar" src={avatarUrl} size="large" alt="Аватар профиля" />
      </AvatarButton>
    </Popover>
  )
}
