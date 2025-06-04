import type { PopoverProps } from "antd/es/popover"

export type UserMenuProps = React.PropsWithChildren<
  Pick<PopoverProps, "open" | "onOpenChange" | "trigger" | "placement" | "classNames"> & {
    avatarUrl?: string
    name?: string
    email?: string
    onLogout?: () => void
    extraContent?: React.ReactNode
  }
>
