import React from "react"

import CheckIcon from "@/shared/icons/check-circle.svg"
import ErrorIcon from "@/shared/icons/close-circle.svg"
import WarningIcon from "@/shared/icons/danger-circle.svg"
import InfoIcon from "@/shared/icons/info-circle.svg"

import { Alert } from "./Notification.styles"
import { NotificationProps } from "./Notification.types"

export const Notification = React.memo((props: NotificationProps) => {
  const { className = "", type, message, description, onClose } = props

  return (
    <Alert
      className={className}
      type={type}
      message={message}
      description={description}
      showIcon
      closable
      onClose={onClose}
      icon={type ? <span>{icons[type]}</span> : null}
    />
  )
})

const icons: Record<NonNullable<NotificationProps["type"]>, React.ReactNode> = {
  error: <ErrorIcon />,
  success: <CheckIcon />,
  info: <InfoIcon />,
  warning: <WarningIcon />,
}
