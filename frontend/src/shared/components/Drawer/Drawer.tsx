import { Button } from "@/shared/components/Button"
import CloseIcon from "@/shared/icons/close.svg"

import { classNames, StyledDrawer } from "./Drawer.styles"
import { DrawerProps } from "./Drawer.types"

export const Drawer = (props: DrawerProps) => {
  const { classNames: classNamesProp } = props

  return (
    <StyledDrawer
      size="large"
      mask={false}
      classNames={{ ...classNames, ...classNamesProp }}
      closeIcon={<Button type="extra-secondary" size="s" icon={<CloseIcon />} tabIndex={-1} />}
      {...props}
    />
  )
}
