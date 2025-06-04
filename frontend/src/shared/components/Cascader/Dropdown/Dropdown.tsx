import { Button } from "@/shared/components/Button"

import { Footer } from "./Dropdown.styles"
import { DropdownProps } from "./Dropdown.types"

export const Dropdown = (props: DropdownProps) => {
  const { menus, onClear } = props

  return (
    <>
      {menus}
      <Footer className="cascader-dropdown-footer">
        <Button type="extra-outline" size="xs" onClick={onClear}>
          Сбросить всё
        </Button>
      </Footer>
    </>
  )
}
