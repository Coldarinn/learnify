import { atom, withSearchParams } from "@reatom/core"
import { reatomComponent } from "@reatom/react"

import { Tabs } from "@/shared/components/Tabs"

import { Email } from "./Email"
import { Password } from "./Password"
import { PersonalInfo } from "./PersonalInfo"
import { Sessions } from "./Sessions"
import { Wrapper } from "./styles"

export const UserProfile = reatomComponent(() => {
  const tab = tabAtom()

  const content = () => {
    switch (tab) {
      case "personal-info":
        return <PersonalInfo />
      case "email":
        return <Email />
      case "password":
        return <Password />
      case "sessions":
        return <Sessions />
      case "billing":
        return <div>Billing</div>
      case "notifications":
        return <div>Notifications</div>
    }
  }

  return (
    <Wrapper>
      <Tabs activeKey={tab} onChange={tabAtom} type="square" items={tabs} />
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

const tabAtom = atom(tabs[0].key).extend(withSearchParams("activeTab"))
