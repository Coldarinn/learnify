import { Popover } from "@/shared/components/Popover"

import SupportIcon from "@/shared/icons/support-bold.svg"

import { Button, Content, Divider, Item, Wrapper } from "./Support.styles"
import { SupportProps } from "./Support.types"

const SupportContent = (props: SupportProps) => {
  const { phone, email } = props

  const clearedPhone = phone?.replace(/\D/g, "")

  return (
    <Content>
      {phone && (
        <Item>
          <SupportIcon />
          <a href={`tel:${clearedPhone}`}>{phone}</a>
        </Item>
      )}
      {email && (
        <Item>
          <SupportIcon />
          <a href={`mailto:${email}`}>{email}</a>
        </Item>
      )}
    </Content>
  )
}

export const Support = (props: SupportProps) => {
  return (
    <Wrapper>
      <Popover placement="bottomRight" content={<SupportContent {...props} />}>
        <Button className="support-button" type="link-secondary" size="s" icon={<SupportIcon />}>
          Тех. поддержка
        </Button>
      </Popover>
      <Divider type="vertical" />
    </Wrapper>
  )
}
