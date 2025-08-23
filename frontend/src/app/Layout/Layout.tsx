import { Outlet } from "react-router"

import ArrowAltIcon from "@/shared/icons/arrow-double-alt-bold.svg"

import { Header } from "./Header"
import { CollapseTrigger, StyledContent, StyledLayout, StyledMenu, StyledSider } from "./Layout.styles"
import DashboardIcon from "./icons/dashboard.svg"

export const Layout = () => {
  return (
    <StyledLayout>
      <Header />
      <StyledLayout hasSider>
        <StyledSider collapsible trigger={<Trigger />} collapsedWidth={56}>
          <StyledMenu
            mode="inline"
            items={[
              {
                key: "dashboard",
                icon: <DashboardIcon />,
                label: `Dashboard`,
              },
            ]}
            defaultSelectedKeys={["dashboard"]}
          />
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
