import { StyledCarousel, typeStyles } from "./Carousel.styles"
import { CarouselProps } from "./Carousel.types"

export const Carousel = (props: CarouselProps) => {
  const { type = "orange" } = props

  const styles = typeStyles[type]

  return <StyledCarousel {...props} css={styles} />
}
