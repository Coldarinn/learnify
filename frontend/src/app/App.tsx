import ConfigProvider from "antd/es/config-provider"
import ruRU from "antd/locale/ru_RU"
import { RouterProvider } from "react-router"

import { ThemeProvider } from "@/shared/theme"

import { router } from "./router"
import "@/shared/styles/main.css"

export const App = () => {
  return (
    <ConfigProvider locale={ruRU}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ConfigProvider>
  )
}
