import { useApiAction } from "@/shared/api"
import { Link } from "@/shared/router"
import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { reatomComponent } from "@reatom/react"
import { Form } from "antd"
import { useWatch } from "antd/es/form/Form"

import { FormInput } from "@/shared/components/Input"
import { Loader } from "@/shared/components/Loader"

import { OAuth, useOAuth } from "../OAuth"
import { Button, Divider, Footer, Title } from "../styles"
import { ForgotPassword } from "./ForgotPassword"
import { signInAction } from "./api"
import { SignInInput } from "./types"
import { useEmailConfirm } from "./useEmailConfirm"

export const SignIn = reatomComponent(() => {
  const signIn = useApiAction(signInAction, {
    error: { message: "Failed to sign in" },
  })
  const isFetching = !signInAction.ready()

  const onFinish = async (values: SignInInput) => {
    if (isFetching) return

    await signIn(values)
  }

  const { isAuthing } = useOAuth()

  const { isConfirming } = useEmailConfirm()

  const [form] = Form.useForm()
  const login = useWatch("login", form)

  return (
    <>
      <Title>Sign In</Title>

      <Form<SignInInput> form={form} name="signin" onFinish={onFinish}>
        <FormInput<SignInInput>
          input={{
            prefix: <UserOutlined />,
            placeholder: "email or username",
            size: "l",
            label: "Login",
          }}
          formItem={{
            name: "login",
            rules: [{ required: true, message: "Please input your email or username" }],
          }}
        />

        <FormInput<SignInInput>
          input={{
            prefix: <LockOutlined />,
            placeholder: "password",
            type: "password",
            size: "l",
            label: "Password",
          }}
          formItem={{
            name: "password",
            rules: [{ required: true, message: "Please input your password" }],
          }}
        />

        <Form.Item>
          <Button htmlType="submit" size="l" loading={isFetching}>
            Sign In
          </Button>
        </Form.Item>
      </Form>

      <ForgotPassword login={login} />

      <Divider>or</Divider>

      <OAuth />

      <Footer>
        <p>Don’t have an account? </p>
        <Link to="/auth/sign-up">Sign Up</Link>
      </Footer>

      <Loader className="oauth-loader" isLoading={isAuthing || isConfirming} />
    </>
  )
})
