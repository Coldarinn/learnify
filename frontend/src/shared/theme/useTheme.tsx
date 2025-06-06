import React from "react"

import { Theme } from "./theme.types"

export const useTheme = () => {
  const [theme, setTheme] = React.useState<Theme>(getTheme())

  const changeTheme = (newTheme: Theme) => {
    document.documentElement.dataset.theme = newTheme
    localStorage.setItem(themeStorageKey, newTheme)
    setTheme(newTheme)
  }

  React.useLayoutEffect(() => {
    const observer = new MutationObserver(() => {
      const newTheme = getTheme()
      setTheme(newTheme)
      localStorage.setItem(themeStorageKey, newTheme)
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    })

    const initTheme = getTheme()
    const storageTheme = localStorage.getItem(themeStorageKey)
    changeTheme((storageTheme || initTheme) as Theme)

    return () => {
      observer.disconnect()
    }
  }, [])

  return { theme, changeTheme }
}

const getTheme = () => {
  const datasetTheme = document.documentElement.dataset.them
  return (datasetTheme ? datasetTheme : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") as Theme
}

const themeStorageKey = "theme"
