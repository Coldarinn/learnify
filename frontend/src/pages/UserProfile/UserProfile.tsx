import { reatomComponent } from "@reatom/react"
import { useState } from "react"

import { Tabs } from "@/shared/components/Tabs"

import { PersonalInfo } from "./PersonalInfo"
import { Wrapper } from "./styles"

export const UserProfile = reatomComponent(() => {
  const [tab, setTab] = useState(tabs[0].key)

  const content = () => {
    switch (tab) {
      case "personal-info":
        return <PersonalInfo />
      case "email":
        return <div>Email</div>
      case "password":
        return <div>Password</div>
      case "sessions":
        return <div>Sessions</div>
      case "billing":
        return <div>Billing</div>
      case "notifications":
        return <div>Notifications</div>
    }
  }

  return (
    <Wrapper>
      <Tabs activeKey={tab} onChange={setTab} type="square" items={tabs} />
      {content()}
    </Wrapper>
  )
})

const tabs = [
  { key: "personal-info", label: "Personal info" },
  { key: "email", label: "Email" },
  { key: "password", label: "Password" },
  { key: "sessions", label: "Sessions" },
  { key: "billing", label: "Billing" },
  { key: "notifications", label: "Notifications" },
]
