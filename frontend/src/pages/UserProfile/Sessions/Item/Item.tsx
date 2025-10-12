import { DesktopOutlined, MobileOutlined } from "@ant-design/icons"
import { reatomComponent } from "@reatom/react"
import dayjs from "dayjs"

import { Session } from "../types"
import { Content, Header, Location, Status, Wrapper } from "./styles"

type Props = {
  session: Session
  isActive: boolean
}

export const Item = reatomComponent((props: Props) => {
  const { isActive, session } = props
  const { createdAt } = session
  const {
    device: { type, os, browser },
    location: { country, city },
  } = session.metadata

  const title = [type || "", os || "", browser || ""].join(" • ")
  const location = `${[country || "", city || ""].join(", ")}`
  const date = createdAt ? `${dayjs(createdAt).format("MM.DD.YYYY")} at ${dayjs(createdAt).format("HH:mm")}` : ""

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
    </Wrapper>
  )
})
