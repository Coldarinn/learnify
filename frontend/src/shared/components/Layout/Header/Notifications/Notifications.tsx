import { Badge } from "@/shared/components/Badge"
import { Notification } from "@/shared/components/Notification"
import { Popover } from "@/shared/components/Popover"
import BellIcon from "@/shared/icons/bell-bold.svg"

import { Button, Content } from "./Notifications.styles"
import { NotificationsProps } from "./Notifications.types"

const NotificationsContent = (props: NotificationsProps) => {
  const { notifications } = props

  return <Content>{notifications?.map((notification, idx) => <Notification key={idx} {...notification} />)}</Content>
}

export const Notifications = (props: NotificationsProps) => {
  return (
    <Popover placement="bottomRight" content={<NotificationsContent {...props} />}>
      <Badge>
        <Button className="support-button" type="extra-secondary" size="m" icon={<BellIcon />} />
      </Badge>
    </Popover>
  )
}
