import styled from "@emotion/styled"
import { Avatar } from "antd"

export const StyledAvatar = styled(Avatar)`
  --font: var(--font-subheading-s);
  --icon-size: 20px;

  font: var(--font);

  background-color: var(--color-surface-elements-sub-accent);
  border: 1px solid var(--color-border-accent-soft);

  &.ant-avatar-image {
    border-color: var(--color-border-tertiary);
  }

  svg {
    width: var(--icon-size);
    height: var(--icon-size);

    color: var(--color-text-accent);

    * {
      fill: currentColor;
    }
  }

  .ant-avatar-string {
    color: var(--color-text-accent-alt);
  }

  &.ant-avatar-lg {
    --font: var(--font-subheading-m);
    --icon-size: 22px;
  }

  &.ant-avatar-sm {
    --font: var(--font-subheading-xs);
    --icon-size: 18px;
  }
`
