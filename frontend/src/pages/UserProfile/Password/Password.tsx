import { useApiAction } from "@/shared/api"
import { reatomComponent } from "@reatom/react"

import { Button } from "@/shared/components/Button"
import { Form } from "@/shared/components/Form"
import { FormInput } from "@/shared/components/Input"

import { Buttons, Header, Row, RowLabel, Subtitle, Title, Titles } from "../styles"
import { changePasswordAction } from "./api"
import { ChangePasswordInput } from "./types"

export const Password = reatomComponent(() => {
  const [form] = Form.useForm<ChangePasswordInput>()

  const changePassword = useApiAction(changePasswordAction, {
    success: {
      message: "Password has been changed",
    },
    error: {
      message: "Failed to change password",
    },
  })
  const isChanging = !changePasswordAction.ready()

  const onFinish = async (values: ChangePasswordInput) => {
    if (isChanging) return

    changePassword({ currentPassword: values.currentPassword, newPassword: values.newPassword }).then(() => {
      form.resetFields()
    })
  }

  return (
    <Form<ChangePasswordInput> form={form} onFinish={onFinish}>
      <Header>
        <Titles>
          <Title>Password</Title>
          <Subtitle>Please enter your current password to change your password</Subtitle>
        </Titles>

        <Buttons>
          <Button type="extra-outline" size="l" onClick={() => form.resetFields()} loading={isChanging}>
            Reset
          </Button>

          <Form.Item>
            <Button htmlType="submit" size="l" loading={isChanging}>
              Save
            </Button>
          </Form.Item>
        </Buttons>
      </Header>

      <Row>
        <RowLabel>Current password</RowLabel>
        <FormInput<ChangePasswordInput>
          input={{
            placeholder: "••••••",
            type: "password",
            size: "l",
          }}
          formItem={{
            name: "currentPassword",
            rules: [{ required: true, message: "Please input your current password" }],
          }}
        />
      </Row>

      <Row>
        <RowLabel>New password</RowLabel>
        <FormInput<ChangePasswordInput>
          input={{
            placeholder: "••••••",
            type: "password",
            size: "l",
          }}
          formItem={{
            name: "newPassword",
            rules: [{ required: true, message: "Please input your new password" }],
          }}
        />
      </Row>

      <Row>
        <RowLabel>Confirm new password</RowLabel>
        <FormInput<ChangePasswordInput>
          input={{
            placeholder: "••••••",
            type: "password",
            size: "l",
          }}
          formItem={{
            name: "confirmPassword",
            rules: [
              ({ getFieldValue }) => ({
                validator: (_, value) =>
                  getFieldValue("newPassword") !== value ? Promise.reject(new Error("Passwords do not match")) : Promise.resolve(),
              }),
            ],
          }}
        />
      </Row>
    </Form>
  )
})
