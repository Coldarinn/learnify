import { userAtom } from "@/entities/user"
import { reatomComponent } from "@reatom/react"

import { Avatar } from "@/shared/components/Avatar"
import { Button } from "@/shared/components/Button"
import { Popover } from "@/shared/components/Popover"

import LogoutIcon from "@/shared/icons/arrow-logout-2.svg"
import CopyIcon from "@/shared/icons/copy.svg"

import { signOutAction } from "./api"
import { AvatarButton, Email, Header, LogoutButton, Name, StyledDivider } from "./styles"

const UserMenuContent = reatomComponent(() => {
  const { avatarUrl, firstName, lastName, email } = userAtom()

  const fullName = `${firstName} ${lastName}`

  return (
    <>
      <Header className="user-menu-header">
        <Avatar className="user-menu-avatar" src={avatarUrl} size="large" alt="Аватар профиля" />
        <div className="user-menu-info">
          <Name className="user-menu-name">{fullName}</Name>
          <Email className="user-menu-email">
            <span>{email}</span>
            <Button size="xs" type="link-secondary" icon={<CopyIcon />} onClick={() => navigator.clipboard.writeText(email)} />
          </Email>
        </div>
      </Header>
      <StyledDivider className="user-menu-divider" />
      <LogoutButton className="user-menu-logout" onClick={signOutAction}>
        <LogoutIcon />
        <span>Выйти из профиля</span>
      </LogoutButton>
    </>
  )
})

export const UserMenu = () => {
  const { avatarUrl } = userAtom()

  return (
    <Popover placement="bottomRight" content={<UserMenuContent />}>
      <AvatarButton className="user-menu-button" type="button">
        <Avatar className="user-menu-avatar" src={avatarUrl} size="large" alt="Аватар профиля" />
      </AvatarButton>
    </Popover>
  )
}
