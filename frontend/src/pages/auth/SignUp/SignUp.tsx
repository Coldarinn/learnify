import { Link, useNavigate } from "@/shared/router"
import { LockOutlined, UserOutlined } from "@ant-design/icons"

import { Form } from "@/shared/components/Form"
import { FormInput } from "@/shared/components/Input"

import { Button, Divider, Footer, Title } from "../styles"

export const SignUp = () => {
  const navigate = useNavigate()

  const onFinish = (values: object) => {
    console.log("Login attempt:", values)
    navigate("/")
  }

  return (
    <>
      <Title>Sign Up</Title>

      <Form name="signup" onFinish={onFinish}>
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
          <Button htmlType="submit">Sign Up</Button>
        </Form.Item>
      </Form>

      <Divider>or</Divider>

      <Footer>
        <p>Already have an account? </p>
        <Link to="/auth/sign-in">Sign In</Link>
      </Footer>
    </>
  )
}
