import type { NotificationArgsProps as AntNotificationArgsProps } from "antd"

export type NotificationArgsProps = Omit<AntNotificationArgsProps, "type"> & {
  type?: "success" | "info" | "warning" | "error" | "grape" | "dark-blue" | "turquoise"
}

type StaticFn = (args: NotificationArgsProps) => void

export type NotificationInstance = {
  success: StaticFn
  error: StaticFn
  info: StaticFn
  warning: StaticFn
  open: StaticFn
  destroy(key?: React.Key): void
}
