import { useState } from "react"

import { ResetModal } from "./ResetModal"
import { Button } from "./styles"

export const ForgotPassword = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Forgot your password?</Button>

      <ResetModal open={isOpen} onCancel={() => setIsOpen(false)} />
    </>
  )
}
