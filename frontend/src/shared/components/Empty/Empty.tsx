import RafikiImageDark from "@/shared/icons/rafiki-dark.svg"
import RafikiImage from "@/shared/icons/rafiki.svg"

import { StyledEmpty } from "./Empty.styles"
import { EmptyProps } from "./Empty.types"
import { useTheme } from "../../theme"

export const Empty = (props: EmptyProps) => {
  const { theme } = useTheme()

  const image = theme === "dark" ? <RafikiImageDark className="clear" /> : <RafikiImage className="clear" />

  return <StyledEmpty image={image} description="Нет данных" {...props} />
}
