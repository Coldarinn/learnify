import { getUserAction } from "@/entities/user"
import { gqlClient } from "@/shared/api"
import "@/shared/styles/main.css"
import { ThemeProvider } from "@/shared/theme"
import { ApolloProvider } from "@apollo/client/react"
import { reatomComponent } from "@reatom/react"
import ConfigProvider from "antd/es/config-provider"
import ruRU from "antd/locale/ru_RU"
import { StrictMode, useEffect } from "react"
import { RouterProvider } from "react-router"

import { Loader } from "@/shared/components/Loader"
import { NotificationProvider } from "@/shared/components/Notification"

import { router } from "./router"

export const App = reatomComponent(() => {
  const isUserFetching = !getUserAction.ready()

  useEffect(() => {
    getUserAction()
  }, [])

  return (
    <StrictMode>
      <ApolloProvider client={gqlClient}>
        <ConfigProvider locale={ruRU}>
          <ThemeProvider>
            <NotificationProvider>
              <RouterProvider router={router} />
            </NotificationProvider>

            <Loader isLoading={isUserFetching} />
          </ThemeProvider>
        </ConfigProvider>
      </ApolloProvider>
    </StrictMode>
  )
})
