import { useState } from "react"

import { Button } from "@/shared/components/Button"

import { ResetModal } from "./ResetModal"

export const ForgotPassword = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Forgot your password?</Button>

      <ResetModal open={isOpen} onCancel={() => setIsOpen(false)} />
    </>
  )
}
