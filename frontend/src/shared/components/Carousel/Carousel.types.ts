import type { CarouselProps as AntCarouselProps } from "antd/es/carousel"

export type CarouselProps = AntCarouselProps & {
  type?: "orange" | "white"
}
