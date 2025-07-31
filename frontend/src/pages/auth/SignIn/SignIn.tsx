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
    const code = new URLSearchParams(window.location.search).get("code")
    console.log("code: ", code)
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

  return (
    <>
      <Title>Sign In</Title>

      <button onClick={redirectToYandex}>Войти через Яндекс</button>

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
