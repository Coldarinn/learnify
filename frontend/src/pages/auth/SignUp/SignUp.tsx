import { Link, useNavigate } from "@/shared/router"
import { LockOutlined, UserOutlined } from "@ant-design/icons"

import { Form } from "@/shared/components/Form"
import { FormInput } from "@/shared/components/Input"

import { Button, Divider, Footer, Title } from "../auth.styles"
import { SignUpInput } from "./SignUp.types"

export const SignUp = () => {
  const navigate = useNavigate()

  const onFinish = (values: SignUpInput) => {
    console.log("SignUpInput:", values)
    navigate("/")
  }

  return (
    <>
      <Title>Sign Up</Title>

      <Form<SignUpInput> name="signup" onFinish={onFinish}>
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
              { required: true, message: "Please input your email" },
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ],
          }}
        />

        <FormInput
          input={{
            prefix: <UserOutlined />,
            placeholder: "username",
            size: "l",
            label: "Username",
          }}
          formItem={{
            name: "username",
            rules: [{ required: true, message: "Please input your username" }],
          }}
        />

        <FormInput
          input={{
            prefix: <UserOutlined />,
            placeholder: "first name",
            size: "l",
            label: "First name",
          }}
          formItem={{
            name: "firstname",
            rules: [{ required: true, message: "Please input your first name" }],
          }}
        />

        <FormInput
          input={{
            prefix: <UserOutlined />,
            placeholder: "last name",
            size: "l",
            label: "Last name",
          }}
          formItem={{
            name: "lastname",
            rules: [{ required: true, message: "Please input your last name" }],
          }}
        />

        <FormInput
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
