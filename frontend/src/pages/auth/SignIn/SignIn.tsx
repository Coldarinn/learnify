import { LockOutlined, UserOutlined } from "@ant-design/icons"

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

  return (
    <>
      <Title>Sign In</Title>

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
