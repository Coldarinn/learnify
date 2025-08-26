import { useState } from "react"

import { ResetModal } from "./ResetModal"
import { Button } from "./styles"

type Props = {
  login: string
}

export const ForgotPassword = (props: Props) => {
  const { login } = props

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Forgot your password?</Button>

      <ResetModal open={isOpen} onCancel={() => setIsOpen(false)} login={login} />
    </>
  )
}
