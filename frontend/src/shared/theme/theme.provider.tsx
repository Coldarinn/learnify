import ConfigProvider from "antd/es/config-provider"

import { commonTokens, themedTokens } from "./theme.tokens"
import { ThemeProviderProps } from "./theme.types"
import { useTheme } from "./useTheme"

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { children, ...otherProps } = props

  const { theme } = useTheme()

  return (
    <ConfigProvider
      theme={{
        ...otherProps,
        cssVar: true,
        token: {
          ...commonTokens,
          ...themedTokens[theme || "light"],
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}
