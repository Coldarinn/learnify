import { useNavigate } from "@/shared/router"
import { MenuProps } from "antd/es/menu"
import { useEffect, useState } from "react"
import { Outlet, useLocation } from "react-router"

import ArrowAltIcon from "@/shared/icons/arrow-double-alt-bold.svg"

import { Header } from "./Header"
import DashboardIcon from "./icons/dashboard.svg"
import { CollapseTrigger, StyledContent, StyledLayout, StyledMenu, StyledSider } from "./styles"

export const Layout = () => {
  const navigate = useNavigate()

  const location = useLocation()
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])

  const menuItems: MenuProps["items"] = [
    {
      key: "dashboard",
      icon: <DashboardIcon />,
      label: `Dashboard`,
      onClick: () => navigate("/dashboard"),
    },
  ]

  useEffect(() => {
    const pathParts = location.pathname.split("/").filter(Boolean)
    setSelectedKeys([pathParts.join("/") || "dashboard"])
    setOpenKeys(pathParts.length > 1 ? [pathParts[0]] : [])
  }, [location.pathname])

  return (
    <StyledLayout>
      <Header />
      <StyledLayout hasSider>
        <StyledSider collapsible trigger={<Trigger />} collapsedWidth={56}>
          <StyledMenu mode="inline" items={menuItems} selectedKeys={selectedKeys} openKeys={openKeys} onOpenChange={setOpenKeys} />
        </StyledSider>
        <StyledContent>
          <Outlet />
        </StyledContent>
      </StyledLayout>
    </StyledLayout>
  )
}

const Trigger = () => (
  <CollapseTrigger className="sider-collapse-trigger">
    <ArrowAltIcon />
    <span>Collapse the menu</span>
  </CollapseTrigger>
)
