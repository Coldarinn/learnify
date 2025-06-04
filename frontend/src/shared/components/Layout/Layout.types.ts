import type { LayoutProps as AntLayoutProps, SiderProps } from "antd/es/layout"
import type { MenuProps } from "antd/es/menu"

import { HeaderProps } from "./Header"

export type LayoutProps = Omit<AntLayoutProps, "hasSider"> & {
  header: HeaderProps
  sider: {
    antProps?: AntLayoutProps & SiderProps
    menu: MenuProps
    onBack?: () => void
  }
  antProps?: AntLayoutProps
}
