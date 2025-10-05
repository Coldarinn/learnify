import { userAtom } from "@/entities/user"
import { useApiAction } from "@/shared/api"
import { reatomComponent } from "@reatom/react"
import { useLayoutEffect, useRef } from "react"
import { useNavigate } from "react-router"

import { Loader } from "@/shared/components/Loader"

import { confirmEmailAction } from "./api"

export const EmailChangeConfirm = reatomComponent(() => {
  const navigate = useNavigate()

  const user = userAtom()

  const tokenRef = useRef<string | null>(null)
  const emailRef = useRef<string | null>(null)

  const confirmEmail = useApiAction(confirmEmailAction, {
    success: {
      message: "The email has been successfully confirmed and changed",
    },
    error: {
      message: "Email confirmation error",
    },
  })

  useLayoutEffect(() => {
    const url = new URL(window.location.href)

    const pathParts = url.pathname.split("/")
    const token = pathParts[pathParts.length - 1]

    const email = url.searchParams.get("email")

    if (token && email) {
      tokenRef.current = token
      emailRef.current = email

      url.searchParams.delete("email")
      window.history.replaceState({}, document.title, url.toString())

      confirmEmail({ token, email })
        .then(() => {
          if (user.id) navigate("/user-profile")
        })
        .catch(() => {
          navigate(user.id ? "/user-profile?activeTab=email" : "/auth/sign-in")
        })
    } else {
      navigate(user.id ? "/user-profile" : "/auth/sign-in")
    }
  }, [])

  return <Loader className="fixed-loader" isLoading />
})
