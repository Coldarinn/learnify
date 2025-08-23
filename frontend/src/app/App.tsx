import "@/shared/styles/main.css"
import { ThemeProvider } from "@/shared/theme"
import ConfigProvider from "antd/es/config-provider"
import ruRU from "antd/locale/ru_RU"
import { StrictMode } from "react"
import { RouterProvider } from "react-router"

import { router } from "./router"

export const App = () => {
  return (
    <StrictMode>
      <ConfigProvider locale={ruRU}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </ConfigProvider>
    </StrictMode>
  )
}
