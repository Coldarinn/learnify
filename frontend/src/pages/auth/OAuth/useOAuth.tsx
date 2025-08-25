import { useApiAction } from "@/shared/api"
import { useLayoutEffect, useState } from "react"

import { signInOAuthAction } from "./api"

export const useOAuth = () => {
  const [isAuthing, setIsAuthing] = useState(false)

  const signInOAuth = useApiAction(signInOAuthAction, {
    error: "Failed to sign in",
  })

  useLayoutEffect(() => {
    ;(async function () {
      try {
        const code = new URLSearchParams(window.location.search).get("code")
        const access_token = new URLSearchParams(window.location.hash).get("access_token")

        if (code || access_token) setIsAuthing(true)

        window.history.replaceState({}, document.title, window.location.pathname)

        if (code) await signInOAuth({ code, provider: "yandex" })
        if (access_token) await signInOAuth({ code: access_token, provider: "google" })
      } finally {
        setIsAuthing(false)
      }
    })()
  }, [])

  return { isAuthing }
}
