import type { LayoutProps as AntLayoutProps } from "antd/es/layout"

import { UserMenuProps } from "@/shared/components/UserMenu"

import { NotificationsProps } from "./Notifications"
import { SupportProps } from "./Support"

export type HeaderProps = {
  antProps?: AntLayoutProps
  support?: SupportProps
  notifications?: NotificationsProps
  userMenu?: UserMenuProps
}
