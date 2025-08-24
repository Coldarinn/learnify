import { NotificationInstance } from "antd/es/notification/interface"
import { createContext } from "react"

import { useLocalNotification } from "./useNotification"

type Props = {
  children: React.ReactNode
}

export const NotificationContext = createContext<NotificationInstance>({} as NotificationInstance)

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
