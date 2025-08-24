import { gqlClient } from "@/shared/api"
import "@/shared/styles/main.css"
import { ThemeProvider } from "@/shared/theme"
import { ApolloProvider } from "@apollo/client/react"
import ConfigProvider from "antd/es/config-provider"
import ruRU from "antd/locale/ru_RU"
import { StrictMode } from "react"
import { RouterProvider } from "react-router"

import { NotificationProvider } from "@/shared/components/Notification"

import { router } from "./router"

export const App = () => {
  return (
    <StrictMode>
      <ApolloProvider client={gqlClient}>
        <ConfigProvider locale={ruRU}>
          <ThemeProvider>
            <NotificationProvider>
              <RouterProvider router={router} />
            </NotificationProvider>
          </ThemeProvider>
        </ConfigProvider>
      </ApolloProvider>
    </StrictMode>
  )
}
