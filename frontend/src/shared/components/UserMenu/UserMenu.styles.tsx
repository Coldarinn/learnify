import styled from "@emotion/styled"

import { Divider } from "@/shared/components/Divider"

export const AvatarButton = styled.button`
  flex-shrink: 0;

  border-radius: var(--radius-circle);
`
export const Header = styled.div`
  display: flex;

  gap: var(--gap-xs);

  align-items: center;
`
export const Name = styled.div`
  overflow: hidden;

  font: var(--font-subheading-l);
  color: var(--color-text-primary);
  text-overflow: ellipsis;
  white-space: nowrap;
`
export const Email = styled.div`
  display: flex;

  gap: var(--gap-5xs);

  align-items: center;

  span:not(.ant-btn-icon) {
    font: var(--font-body-regular-s);
    color: var(--color-text-secondary);
  }
`
export const StyledDivider = styled(Divider)`
  margin: var(--gap-xs) 0;
`
export const LogoutButton = styled.button`
  display: flex;

  gap: var(--gap-4xs);

  align-items: center;

  width: 100%;
  height: 40px;
  padding: 0 var(--gap-3xs);

  color: var(--color-text-secondary);

  transition: 0.2s color ease-in-out;

  svg {
    flex-shrink: 0;

    width: 16px;
    height: 16px;

    fill: currentColor;
  }

  span {
    overflow: hidden;

    font: var(--font-subheading-m);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover {
    color: var(--color-text-accent-hover);
  }
  &:active {
    color: var(--color-text-accent);
  }
`
