import { userAtom } from "@/entities/user"
import { useApiAction } from "@/shared/api"
import { reatomComponent } from "@reatom/react"

import { Button } from "@/shared/components/Button"
import { Form } from "@/shared/components/Form"
import { FormInput } from "@/shared/components/Input"
import { useNotification } from "@/shared/components/Notification"

import { changeEmailAction } from "./api"
import { Buttons, Header, Row, RowLabel, Subtitle, Title, Titles } from "./styles"
import { ChangeEmailInput } from "./types"

export const Email = reatomComponent(() => {
  const notify = useNotification()

  const user = userAtom()

  const [form] = Form.useForm<ChangeEmailInput>()

  const changeEmail = useApiAction(changeEmailAction, {
    success: {
      message: "A confirmation email has been sent to your email",
    },
    error: {
      message: "Failed to change email",
    },
  })
  const isChanging = !changeEmailAction.ready()

  const onFinish = async (values: ChangeEmailInput) => {
    if (isChanging) return

    if (values.newEmail === user.email) {
      notify.error({ message: "New email must be different from the current one" })
      return
    }

    changeEmail(values)
  }

  return (
    <Form<ChangeEmailInput> form={form} onFinish={onFinish}>
      <Header>
        <Titles>
          <Title>Email</Title>
          <Subtitle>Please enter new email to change your email</Subtitle>
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
        <RowLabel>Your password</RowLabel>
        <FormInput<ChangeEmailInput>
          input={{
            placeholder: "••••••",
            size: "l",
          }}
          formItem={{
            name: "currentPassword",
            rules: [{ required: true, message: "Please input your password" }],
          }}
        />
      </Row>

      <Row>
        <RowLabel>New Email</RowLabel>
        <FormInput<ChangeEmailInput>
          input={{
            placeholder: "email",
            size: "l",
          }}
          formItem={{
            name: "newEmail",
            rules: [
              { required: true, message: "Please input your new email" },
              {
                type: "email",
                message: "The input is not valid email",
              },
            ],
          }}
        />
      </Row>
    </Form>
  )
})
