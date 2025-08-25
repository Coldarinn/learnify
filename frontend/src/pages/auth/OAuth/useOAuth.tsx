import { useApiAction } from "@/shared/api"
import { useLayoutEffect, useState } from "react"

import { signInOAuthAction } from "./api"

export const useOAuth = () => {
  const [isAuthing, setIsAuthing] = useState(false)

  const signInOAuth = useApiAction(signInOAuthAction, {
    error: { message: "Failed to sign in" },
  })

  useLayoutEffect(() => {
    ;(async function () {
      try {
        const url = new URL(window.location.href)

        const code = url.searchParams.get("code")
        const hashParams = new URLSearchParams(url.hash.slice(1))
        const access_token = hashParams.get("access_token")

        if (code || access_token) setIsAuthing(true)

        url.searchParams.delete("code")
        hashParams.delete("access_token")
        url.hash = hashParams.toString() ? `#${hashParams.toString()}` : ""
        window.history.replaceState({}, document.title, url.toString())

        if (code) await signInOAuth({ code, provider: "yandex" })
        if (access_token) await signInOAuth({ code: access_token, provider: "google" })
      } finally {
        setIsAuthing(false)
      }
    })()
  }, [])

  return { isAuthing }
}
