import React from "react"

import { NotificationInstance } from "./Notification.types"
import { useLocalNotification } from "./useNotification"

type Props = {
  children: React.ReactNode
}

export const NotificationContext = React.createContext<NotificationInstance>({} as NotificationInstance)

export const NotificationProvider = (props: Props) => {
  const { children } = props

  const { api, contextHolder } = useLocalNotification()

  return (
    <NotificationContext.Provider value={api}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  )
}
