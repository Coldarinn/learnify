import { useApiAction } from "@/shared/api"
import { useLayoutEffect, useRef, useState } from "react"

import { Button } from "@/shared/components/Button"

import { confirmEmailAction, resendConfirmEmailAction } from "./api"

export const useEmailConfirm = () => {
  const [isConfirming, setIsConfirming] = useState(false)
  const tokenRef = useRef("")

  const resendConfirmEmail = useApiAction(resendConfirmEmailAction, {
    success: {
      message: "A confirmation email has been resent to your email address",
    },
  })
  const isResending = !resendConfirmEmailAction.ready()
  const onResend = () => {
    if (isResending) return

    resendConfirmEmail(tokenRef.current)
  }
  const cofirmEmail = useApiAction(confirmEmailAction, {
    success: {
      message: "The email has been successfully confirmed. You can sign in to your account",
    },
    error: {
      message: "Email confirmation error",
      description: (message) => {
        if (String(message).includes("expired"))
          return (
            <Button type="link-secondary" size="s" loading={isResending} onClick={onResend}>
              Resend confirmation email
            </Button>
          )
      },
      duration: 5,
      pauseOnHover: true,
    },
  })

  useLayoutEffect(() => {
    ;(async function () {
      try {
        const url = new URL(window.location.href)

        const token = url.searchParams.get("confirm-email-token")

        if (token) {
          setIsConfirming(true)
          tokenRef.current = token
        }

        url.searchParams.delete("confirm-email-token")
        window.history.replaceState({}, document.title, url.toString())

        if (token) await cofirmEmail(token)
      } finally {
        setIsConfirming(false)
      }
    })()
  }, [])

  return { isConfirming }
}
