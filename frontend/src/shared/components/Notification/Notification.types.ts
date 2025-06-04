export type { NotificationConfig } from "antd/es/notification/interface"
import type { NotificationArgsProps as AntNotificationArgsProps } from "antd/es"

export type NotificationArgsProps = AntNotificationArgsProps

export type NotificationProps = Pick<NotificationArgsProps, "message" | "description" | "onClose"> & {
  type?: "info" | "warning" | "error" | "success"
  className?: string
}
