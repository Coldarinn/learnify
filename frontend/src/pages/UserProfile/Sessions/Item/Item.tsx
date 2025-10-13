import { useApiAction } from "@/shared/api"
import { DeleteOutlined, DesktopOutlined, MobileOutlined } from "@ant-design/icons"
import { reatomComponent } from "@reatom/react"
import dayjs from "dayjs"
import { useState } from "react"

import { Button } from "@/shared/components/Button"
import { Modal } from "@/shared/components/Modal"

import { currentSessionResource, sessionsResource } from "../api"
import { Session } from "../types"
import { terminateSessionAction } from "./api"
import { Content, Header, Location, Status, Wrapper } from "./styles"

type Props = {
  session: Session
  isActive: boolean
  isPrimary: boolean
}

export const Item = reatomComponent((props: Props) => {
  const { session, isActive, isPrimary } = props
  const { createdAt } = session
  const {
    device: { type, os, browser },
    location: { country, city },
  } = session.metadata

  const title = [type || "", os || "", browser || ""].join(" • ")
  const location = `${[country || "", city || ""].join(", ")}`
  const date = createdAt ? `${dayjs(createdAt).format("MM.DD.YYYY")} at ${dayjs(createdAt).format("HH:mm")}` : ""

  const [isOpen, setIsOpen] = useState(false)

  const terminateSession = useApiAction(terminateSessionAction)
  const isTerminating = !terminateSessionAction.ready()

  const canBeTerminated = isPrimary && session.id !== (currentSessionResource.data() as Session).id

  const onTerminate = () => {
    if (isTerminating) return
    terminateSession(session.id).then(() => {
      sessionsResource.data.set((prev) => prev.filter((s) => s.id !== session.id))
    })
  }

  return (
    <Wrapper>
      {type.toLowerCase() === "mobile" ? <MobileOutlined className="icon" /> : <DesktopOutlined className="icon" />}

      <Content>
        <Header>
          <span>{title}</span>
          {isActive && <Status>Active now</Status>}
        </Header>

        <Location>
          {location}
          {date ? (
            <>
              {location && <span>•</span>} {date}
            </>
          ) : null}
        </Location>
      </Content>

      {canBeTerminated && <Button type="extra-outline" size="s" icon={<DeleteOutlined />} onClick={() => setIsOpen(true)} />}

      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Are you sure you want to terminate the session?"
        okText="Terminate"
        onOk={onTerminate}
        cancelButtonProps={{ loading: isTerminating }}
        okButtonProps={{ loading: isTerminating }}
      />
    </Wrapper>
  )
})
