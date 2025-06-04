import { Button } from "@/shared/components/Button"
import { useTheme } from "@/shared/theme"

import ImageDark from "./images/image-dark.png"
import Image from "./images/image.png"
import { Wrapper, Text } from "./Plug.styles"
import { PlugProps } from "./Plug.types"

export const Plug = (props: PlugProps) => {
  const { className, onRedirect } = props

  const { theme } = useTheme()

  const image = theme === "dark" ? ImageDark : Image

  const redirect = () => {
    if (onRedirect) {
      onRedirect()
      return
    }

    window.location.pathname = "/"
  }

  return (
    <Wrapper className={className}>
      <img src={image} />
      <Text>Извините, страница не найдена</Text>
      <Button size="xl" onClick={redirect}>
        Вернуться на Главную
      </Button>
    </Wrapper>
  )
}
