import React from "react"

import { Theme } from "./theme.types"

export const useTheme = () => {
  const [theme, setTheme] = React.useState<Theme>("light")

  const changeTheme = (newTheme: Theme) => {
    document.documentElement.dataset.theme = newTheme
    localStorage.setItem(themeStorageKey, newTheme)
    setTheme(newTheme)
  }

  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      const datasetTheme = document.documentElement.dataset.theme
      const newTheme = (
        datasetTheme ? datasetTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark"
        : "light") as Theme
      setTheme(newTheme)
      localStorage.setItem(themeStorageKey, newTheme)
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    })

    const storageTheme = localStorage.getItem(themeStorageKey)
    changeTheme((storageTheme || "light") as Theme)

    return () => {
      observer.disconnect()
    }
  }, [])

  return { theme, changeTheme }
}

const themeStorageKey = "theme"
