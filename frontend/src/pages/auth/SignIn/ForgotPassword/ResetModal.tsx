import { useApiAction } from "@/shared/api"
import { reatomComponent } from "@reatom/react"

import { Button } from "@/shared/components/Button"
import { Form } from "@/shared/components/Form"
import { FormInput } from "@/shared/components/Input"
import { Modal, ModalProps } from "@/shared/components/Modal"

import { requestPasswordResetAction } from "./api"
import { ModalStyles, Text } from "./styles"
import { RequestPasswordResetInput } from "./types"

type Props = Pick<ModalProps, "open" | "onCancel"> & {
  login: string
}

export const ResetModal = reatomComponent((props: Props) => {
  const { open, onCancel, login } = props

  const [form] = Form.useForm()

  const requestPasswordReset = useApiAction(requestPasswordResetAction, {
    error: { message: "Failed to reset password" },
    success: { message: "A password reset email has been sent to your email address" },
  })
  const isSending = !requestPasswordResetAction.ready()

  const onFinish = async (values: RequestPasswordResetInput) => {
    if (isSending) return

    await requestPasswordReset(values)
    // @ts-ignore
    onCancel()
  }

  const initialValues: RequestPasswordResetInput = {
    email: login,
  }

  return (
    <Modal
      rootClassName={ModalStyles}
      open={open}
      onCancel={onCancel}
      title="Reset password"
      closeIcon={null}
      footer={<Footer onCancel={onCancel} onSubmit={() => form.submit()} isSending={isSending} />}
    >
      <Text>Enter your account's email address, and we'll send you a link to reset your password</Text>

      <Form<RequestPasswordResetInput> form={form} name="reset-password" onFinish={onFinish} initialValues={{ ...initialValues }}>
        <FormInput<RequestPasswordResetInput>
          input={{
            placeholder: "Email address",
          }}
          formItem={{
            name: "email",
            rules: [
              { required: true, message: "Please input your email" },
              {
                type: "email",
                message: "The input is not valid email",
              },
            ],
          }}
        />
      </Form>
    </Modal>
  )
})

type FooterProps = Pick<ModalProps, "onCancel"> & { isSending: boolean; onSubmit: () => void }

const Footer = (props: FooterProps) => {
  const { onCancel, onSubmit, isSending } = props

  return (
    <>
      <Button type="link-primary" onClick={onCancel} loading={isSending}>
        Cancel
      </Button>
      <Button onClick={onSubmit} loading={isSending}>
        Continue
      </Button>
    </>
  )
}
