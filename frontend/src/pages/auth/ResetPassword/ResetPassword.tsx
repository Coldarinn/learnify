import { useApiAction } from "@/shared/api"
import { useNavigate, useParams } from "@/shared/router"
import { LockOutlined } from "@ant-design/icons"
import { reatomComponent } from "@reatom/react"

import { Form } from "@/shared/components/Form"
import { FormInput } from "@/shared/components/Input"

import { Button, Title } from "../styles"
import { resetPasswordAction } from "./api"
import { ResetPasswordInput } from "./types"

export const ResetPassword = reatomComponent(() => {
  const resetPassword = useApiAction(resetPasswordAction, {
    error: { message: "Failed to reset password" },
    success: { message: "Your password has been updated" },
  })
  const isReseting = !resetPasswordAction.ready()

  const navigate = useNavigate()

  const { token } = useParams("/auth/reset-password")

  const onFinish = async (values: Omit<ResetPasswordInput, "token">) => {
    if (isReseting) return

    await resetPassword({ ...values, token })
    navigate("/auth/sign-in")
  }

  return (
    <>
      <Title>Password reset</Title>

      <Form<ResetPasswordInput> name="signin" onFinish={onFinish}>
        <FormInput<ResetPasswordInput>
          input={{
            prefix: <LockOutlined />,
            placeholder: "password",
            type: "password",
            size: "l",
            label: "New password",
          }}
          formItem={{
            name: "newPassword",
            rules: [{ required: true, min: 6, message: "The password must be longer than 5 characters" }],
          }}
        />

        <FormInput<ResetPasswordInput>
          input={{
            prefix: <LockOutlined />,
            placeholder: "password",
            type: "password",
            size: "l",
            label: "Confirm password",
          }}
          formItem={{
            name: "confirmPassword",
            dependencies: ["newPassword"],
            rules: [
              { required: true, message: "Please confirm your new password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error("Passwords do not match"))
                },
              }),
            ],
          }}
        />

        <Form.Item>
          <Button htmlType="submit" size="l" loading={isReseting}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </>
  )
})
