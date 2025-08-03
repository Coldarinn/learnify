import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { useLayoutEffect } from "react"

import { Form, FormInput } from "@/shared/components"
import { Link, useNavigate } from "@/shared/router"

import { Footer, Button, Title, Divider } from "../styles"
import { ForgotPassword } from "./ForgotPassword/ForgotPassword"

export const SignIn = () => {
  const navigate = useNavigate()

  const onFinish = (values: object) => {
    console.log("Login attempt:", values)
    navigate("/")
  }

  useLayoutEffect(() => {
    console.log("window.location: ", window.location)
    const code = new URLSearchParams(window.location.search).get("code")
    const access_token = new URLSearchParams(window.location.hash).get("access_token")
    // remove code and access_token from url
    console.log("code: ", code)
    console.log("access_token: ", access_token)
  }, [])

  const redirectToYandex = () => {
    const clientId = "da3a58a6f6d440909e444e48dab9a348"
    const redirectUri = "http://localhost:3000/auth/sign-in"

    const authUrl =
      "https://oauth.yandex.ru/authorize?" +
      new URLSearchParams({
        response_type: "code",
        client_id: clientId,
        redirect_uri: redirectUri,
        force_confirm: "yes",
      }).toString()

    window.location.href = authUrl
  }

  function oauthSignIn() {
    const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth"

    const form = document.createElement("form")
    form.setAttribute("method", "GET")
    form.setAttribute("action", oauth2Endpoint)

    const params = {
      client_id: "566926243482-72pudmt4a11rm908gensjkcg6ailoisv.apps.googleusercontent.com",
      redirect_uri: "http://localhost:3000/auth/sign-in",
      response_type: "token",
      scope: "openid email profile",
      include_granted_scopes: "true",
      state: "pass-through value",
    }

    for (const p in params) {
      const input = document.createElement("input")
      input.setAttribute("type", "hidden")
      input.setAttribute("name", p)
      // @ts-ignore
      input.setAttribute("value", params[p])
      form.appendChild(input)
    }

    document.body.appendChild(form)
    form.submit()
    form.remove()
  }

  return (
    <>
      <Title>Sign In</Title>

      <button onClick={redirectToYandex}>Войти через Яндекс</button>
      <button onClick={oauthSignIn}>Войти через Google</button>

      <Form name="signin" onFinish={onFinish}>
        <FormInput
          input={{
            prefix: <UserOutlined />,
            placeholder: "your@email.com",
            size: "l",
            label: "Email",
          }}
          formItem={{
            name: "email",
            rules: [
              { required: true, message: "Please input your email!" },
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ],
          }}
        />

        <FormInput
          input={{
            prefix: <LockOutlined />,
            type: "password",
            size: "l",
            label: "Password",
          }}
          formItem={{
            name: "password",
            rules: [{ required: true, message: "Please input your password!" }],
          }}
        />

        <Form.Item>
          <Button htmlType="submit">Sign In</Button>
        </Form.Item>
      </Form>

      <ForgotPassword />

      <Divider>or</Divider>

      {/* <Button icon={<GoogleOutlined />}>Sign in with Google</Button> */}

      <Footer>
        <p>Don’t have an account? </p>
        <Link to="/auth/sign-up">Sign Up</Link>
      </Footer>
    </>
  )
}
