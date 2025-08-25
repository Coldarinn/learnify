import { useEffect, useState } from "react"

import { Spinner, Wrapper } from "./styles"

type Props = {
  isLoading?: boolean
  className?: string
}

export const Loader = (props: Props) => {
  const { isLoading, className = "" } = props

  const [visible, setVisible] = useState(isLoading)

  useEffect(() => {
    if (isLoading) {
      setVisible(true)
    } else {
      const timeout = setTimeout(() => setVisible(false), 250)
      return () => clearTimeout(timeout)
    }
  }, [isLoading])

  return visible ? (
    <Wrapper className={`loader ${className} ${isLoading ? "show" : "hide"}`}>
      <Spinner />
    </Wrapper>
  ) : null
}
