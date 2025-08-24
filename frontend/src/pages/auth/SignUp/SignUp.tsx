import { useApiAction } from "@/shared/api"
import { Link, useNavigate } from "@/shared/router"
import { GoogleOutlined, LockOutlined, UserOutlined } from "@ant-design/icons"
import { reatomComponent } from "@reatom/react"

import { Form } from "@/shared/components/Form"
import { FormInput } from "@/shared/components/Input"

import { Button, Divider, Footer, OAuth, Title } from "../styles"
import { signUpAction } from "./api"
import YandexIcon from "./icons/yandex.svg"
import { SignUpInput } from "./types"

export const SignUp = reatomComponent(() => {
  const navigate = useNavigate()

  const isFetching = !signUpAction.ready()

  const signUp = useApiAction(signUpAction, {
    error: "Failed to create an account",
    success: "A confirmation email has been sent to your email address",
  })

  const onFinish = async (values: SignUpInput) => {
    if (isFetching) return

    await signUp(values)
    navigate("/auth/sign-in")
  }

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
    <>
      <Title>Sign Up</Title>

      <Form<SignUpInput> name="signup" onFinish={onFinish}>
        <FormInput<SignUpInput>
          input={{
            prefix: <UserOutlined />,
            placeholder: "your@email.com",
            size: "l",
            label: "Email",
          }}
          formItem={{
            name: "email",
            rules: [
              { required: true, message: "Please input your email" },
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ],
          }}
        />

        <FormInput<SignUpInput>
          input={{
            prefix: <UserOutlined />,
            placeholder: "username",
            size: "l",
            label: "Username",
          }}
          formItem={{
            name: "username",
            rules: [
              { required: true, message: "Please input your username" },
              {
                pattern: /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/,
                message: "Value must contain only letters, numbers, and optional hyphens (not at the start or end)",
              },
            ],
          }}
        />

        <FormInput<SignUpInput>
          input={{
            prefix: <UserOutlined />,
            placeholder: "first name",
            size: "l",
            label: "First name",
          }}
          formItem={{
            name: "firstName",
            rules: [{ required: true, message: "Please input your first name" }],
          }}
        />

        <FormInput<SignUpInput>
          input={{
            prefix: <UserOutlined />,
            placeholder: "last name",
            size: "l",
            label: "Last name",
          }}
          formItem={{
            name: "lastName",
            rules: [{ required: true, message: "Please input your last name" }],
          }}
        />

        <FormInput<SignUpInput>
          input={{
            prefix: <LockOutlined />,
            placeholder: "password",
            type: "password",
            size: "l",
            label: "Password",
          }}
          formItem={{
            name: "password",
            rules: [{ required: true, min: 6, message: "The password must be longer than 5 characters" }],
          }}
        />

        <Form.Item>
          <Button htmlType="submit" size="l" loading={isFetching}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>

      <Divider>or</Divider>

      <OAuth>
        <Button icon={<GoogleOutlined />} type="extra-outline" onClick={redirectToGoogleOAuth}>
          Sign In with Google
        </Button>

        <Button icon={<YandexIcon />} type="extra-outline" onClick={redirectToYandexOAuth}>
          Sign In with Yandex
        </Button>
      </OAuth>

      <Footer>
        <p>Already have an account? </p>
        <Link to="/auth/sign-in">Sign In</Link>
      </Footer>
    </>
  )
})
