import { type AliasToken } from "antd/es/theme/internal"

import { Theme } from "./theme.types"

export const commonTokens: Partial<AliasToken> = {
  colorPrimary: "#f76818",
  colorInfo: "#f76818",
  colorError: "#ef2c2e",
  colorTextBase: "#141414",
}

export const themedTokens: Record<Theme, Partial<AliasToken>> = {
  light: {
    colorTextBase: "#141414",
  },
  dark: {
    colorTextBase: "#fafafa",
  },
}
