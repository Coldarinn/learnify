import { userAtom } from "@/entities/user"
import { reatomComponent } from "@reatom/react"

import { Form } from "@/shared/components/Form"

import { Header, Subtitle, Title, Titles } from "../styles"
import { Item } from "./Item"
import { currentSessionResource, sessionsResource } from "./api"
import { List } from "./styles"

export const Sessions = reatomComponent(() => {
  const [form] = Form.useForm()

  const { email } = userAtom()

  const sessions = sessionsResource.data()
  const currentSession = currentSessionResource.data()

  const sortedSessions = sessions.slice().sort((a, b) => {
    if (!("id" in currentSession)) return 0
    if (a.id === currentSession.id) return -1
    if (b.id === currentSession.id) return 1
    return 0
  })

  return (
    <Form form={form}>
      <Header>
        <Titles>
          <Title>Where you're logged in</Title>
          <Subtitle>We'll alert you via {email} if there is any unusual activity on your account</Subtitle>
        </Titles>
      </Header>

      <List>
        {sortedSessions.map((session, idx) => (
          <Item key={session.id} session={session} isActive={!idx} />
        ))}
      </List>
    </Form>
  )
})
