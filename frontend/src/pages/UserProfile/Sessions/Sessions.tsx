import { userAtom } from "@/entities/user"
import { reatomComponent } from "@reatom/react"

import { Form } from "@/shared/components/Form"

import { Header, Subtitle, Title, Titles } from "../styles"
import { ChangeSessionInput } from "./types"

export const Sessions = reatomComponent(() => {
  const [form] = Form.useForm<ChangeSessionInput>()

  const { email } = userAtom()

  return (
    <Form<ChangeSessionInput> form={form}>
      <Header>
        <Titles>
          <Title>Where you're logged in</Title>
          <Subtitle>We'll alert you via {email} if there is any unusual activity on your account</Subtitle>
        </Titles>
      </Header>
    </Form>
  )
})
