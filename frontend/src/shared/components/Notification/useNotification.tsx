import notification from "antd/es/notification"
import type { NotificationConfig } from "antd/es/notification/interface"
import { useContext } from "react"

import CheckIcon from "@/shared/icons/check-circle.svg"
import ErrorIcon from "@/shared/icons/close-circle.svg"
import CloseIcon from "@/shared/icons/close.svg"
import WarningIcon from "@/shared/icons/danger-circle.svg"
import InfoIcon from "@/shared/icons/info-circle.svg"

import { StyledNotification } from "./Notification.styles"
import { NotificationContext } from "./NotificationProvider"

export const useLocalNotification = (props?: NotificationConfig) => {
  const [antApi, contextHolder] = notification.useNotification(props)

  const api: typeof antApi = {
    ...antApi,
    open: (args) => {
      antApi.open({
        icon: <InfoIcon />,
        closeIcon: <CloseIcon />,
        ...args,
        className: `${StyledNotification} ${args.className || ""}`,
      })
    },
    success: (args) => {
      antApi.success({
        icon: <CheckIcon />,
        closeIcon: <CloseIcon />,
        ...args,
        className: `${StyledNotification} ${args.className || ""}`,
      })
    },
    error: (args) => {
      antApi.error({
        icon: <ErrorIcon />,
        closeIcon: <CloseIcon />,
        ...args,
        className: `${StyledNotification} ${args.className || ""}`,
      })
    },
    warning: (args) => {
      antApi.warning({
        icon: <WarningIcon />,
        closeIcon: <CloseIcon />,
        ...args,
        className: `${StyledNotification} ${args.className || ""}`,
      })
    },
  }

  return { api, contextHolder }
}

export const useNotification = () => {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error("useGlobalNotification must be used inside NotificationProvider")
  return ctx
}
