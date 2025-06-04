import { css, type SerializedStyles } from "@emotion/react"
import styled from "@emotion/styled"
import Carousel from "antd/es/carousel"

import { CarouselProps } from "./Carousel.types"

export const StyledCarousel = styled(Carousel)`
  background-color: var(--bg-color);
  border-radius: var(--radius-3xs);

  .slick-dots {
    li {
      width: 4px;
      height: 4px;
      margin: 0 var(--gap-4xs);

      background-color: var(--color);

      &:hover {
        background-color: var(--color-hover);
      }

      button {
        height: 100%;

        border-radius: var(--radius-circle);
      }

      &::after {
        height: 100%;

        background: var(--color-active) !important;
        border-radius: var(--radius-3xs) !important;
      }

      &.slick-active {
        width: 16px;

        button {
          border-radius: var(--radius-3xs);
        }
      }
    }
  }
`

export const typeStyles: Record<NonNullable<CarouselProps["type"]>, SerializedStyles> = {
  orange: css`
    --color: var(--color-transparent-dark-150);
    --color-hover: var(--color-transparent-dark-400);
    --color-active: var(--color-surface-elements-accent);
    --bg-color: transparent;
  `,
  white: css`
    --color: var(--color-transparent-light-150);
    --color-hover: var(--color-transparent-light-400);
    --color-active: var(--color-surface-base-primary);
    --bg-color: #c2c2c2;
  `,
}
