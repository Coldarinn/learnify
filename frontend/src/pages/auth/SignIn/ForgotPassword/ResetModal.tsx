import { Button } from "@/shared/components/Button"
import { Form } from "@/shared/components/Form"
import { FormInput } from "@/shared/components/Input"
import { Modal, ModalProps } from "@/shared/components/Modal"

import { Text } from "./styles"

export const ResetModal = (props: Pick<ModalProps, "open" | "onCancel">) => {
  const { open, onCancel } = props

  const [form] = Form.useForm()

  const onFinish = (values: object) => {
    console.log("reset attempt:", values)
  }

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title="Reset password"
      closeIcon={null}
      footer={<Footer onCancel={onCancel} onSubmit={() => form.submit()} />}
    >
      <Text>Enter your account's email address, and we'll send you a link to reset your password.</Text>

      <Form form={form} name="reset-password" onFinish={onFinish}>
        <FormInput
          input={{
            placeholder: "Email address",
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
      </Form>
    </Modal>
  )
}

type FooterProps = Pick<ModalProps, "onCancel"> & { onSubmit: () => void }

const Footer = (props: FooterProps) => {
  const { onCancel, onSubmit } = props

  return (
    <>
      <Button type="link-primary" onClick={onCancel}>
        Cancel
      </Button>
      <Button onClick={onSubmit}>Continue</Button>
    </>
  )
}
