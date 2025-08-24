import { NotificationInstance } from "antd/es/notification/interface"
import { createContext, useContext } from "react"

import { useNotification } from "./useNotification"

type Props = {
  children: React.ReactNode
}

const NotificationContext = createContext<NotificationInstance>({} as NotificationInstance)

export const NotificationProvider = (props: Props) => {
  const { children } = props

  const { api, contextHolder } = useNotification()

  return (
    <NotificationContext.Provider value={api}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  )
}

export const useGlobalNotification = () => {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error("useGlobalNotification must be used inside NotificationProvider")
  return ctx
}
