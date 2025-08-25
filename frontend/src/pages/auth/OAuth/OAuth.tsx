import { GoogleOutlined } from "@ant-design/icons"

import { Button } from "@/shared/components/Button"

import { OAuth as Wrapper } from "../styles"
import YandexIcon from "./icons/yandex.svg"

export const OAuth = () => {
  const redirectToYandexOAuth = () => {
    const authUrl =
      `${import.meta.env.VITE_OAUTH_YANDEX_URL}?` +
      new URLSearchParams({
        response_type: "code",
        client_id: import.meta.env.VITE_OAUTH_YANDEX_CLIENT_ID,
        redirect_uri: `${window.location.origin}${import.meta.env.VITE_OAUTH_REDIRECT_ROUTE}`,
        force_confirm: "yes",
      }).toString()

    window.location.href = authUrl
  }

  const redirectToGoogleOAuth = () => {
    const form = document.createElement("form")
    form.setAttribute("method", "GET")
    form.setAttribute("action", import.meta.env.VITE_OAUTH_GOOGLE_TOKEN_URL)

    const params: Record<string, string> = {
      client_id: import.meta.env.VITE_OAUTH_GOOGLE_CLIENT_ID,
      redirect_uri: `${window.location.origin}${import.meta.env.VITE_OAUTH_REDIRECT_ROUTE}`,
      response_type: "token",
      scope: "openid email profile",
      include_granted_scopes: "true",
      state: "pass-through value",
    }

    for (const p in params) {
      const input = document.createElement("input")
      input.setAttribute("type", "hidden")
      input.setAttribute("name", p)
      input.setAttribute("value", params[p])
      form.appendChild(input)
    }

    document.body.appendChild(form)
    form.submit()
    form.remove()
  }

  return (
    <Wrapper>
      <Button icon={<GoogleOutlined />} type="extra-outline" onClick={redirectToGoogleOAuth}>
        Sign In with Google
      </Button>

      <Button icon={<YandexIcon />} type="extra-outline" onClick={redirectToYandexOAuth}>
        Sign In with Yandex
      </Button>
    </Wrapper>
  )
}
