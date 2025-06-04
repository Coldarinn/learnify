import styled from "@emotion/styled"

import { Button as BaseButton } from "@/shared/components/Button"
import { Divider as BaseDivider } from "@/shared/components/Divider"

export const Button = styled(BaseButton)`
  &.ant-btn .ant-btn-icon {
    > svg {
      width: 16px;
      height: 16px;

      color: currentColor;

      * {
        fill: currentColor;
      }
    }
  }
`
export const Divider = styled(BaseDivider)`
  height: 32px;
  margin: 0;
`
export const Wrapper = styled.div`
  display: flex;

  gap: var(--gap-5xs);

  align-items: center;
`
export const Content = styled.div`
  display: grid;

  gap: var(--gap-xs);
`
export const Item = styled.div`
  display: flex;

  gap: var(--gap-3xs);

  align-items: center;

  svg {
    width: 16px;
    height: 16px;

    color: var(--color-icon-primary);

    * {
      fill: currentColor;
    }
  }

  a {
    font: var(--font-subheading-s);
    color: var(--color-text-primary);

    &:hover {
      color: var(--color-text-accent);
    }

    &:focus-visible {
      border-radius: var(--radius-2xs);
      outline: var(--ant-line-width-focus) solid var(--ant-color-primary-border);
      outline-offset: 1px;
    }
  }
`
