import { Button } from "@/shared/components/Button"
import ArrowAltIcon from "@/shared/icons/arrow-double-alt-bold.svg"
import ArrowIcon from "@/shared/icons/arrow.svg"

import { Header } from "./Header"
import { BackButtonWrap, CollapseTrigger, Divider, StyledContent, StyledLayout, StyledMenu, StyledSider } from "./Layout.styles"
import { LayoutProps } from "./Layout.types"

export const Layout = (props: LayoutProps) => {
  const { header, sider, antProps, children, ...otherProps } = props

  return (
    <StyledLayout {...otherProps}>
      <Header {...header} />
      <StyledLayout hasSider>
        <StyledSider collapsible trigger={<Trigger />} collapsedWidth={56} {...sider.antProps}>
          <BackButtonWrap className="sider-go-back">
            <Button type="link" size="xs" icon={<ArrowIcon />} onClick={sider.onBack}>
              На главную
            </Button>
            <Divider />
          </BackButtonWrap>
          <StyledMenu mode="inline" {...sider.menu} />
        </StyledSider>
        <StyledContent {...antProps}>{children}</StyledContent>
      </StyledLayout>
    </StyledLayout>
  )
}

const Trigger = () => (
  <CollapseTrigger className="sider-collapse-trigger">
    <ArrowAltIcon />
    <span>Свернуть меню</span>
  </CollapseTrigger>
)
