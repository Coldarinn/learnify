import { css } from "@emotion/react"
import styled from "@emotion/styled"

import { Avatar as BaseAvatar } from "@/shared/components/Avatar"
import { Button } from "@/shared/components/Button"

import { CommentProps } from "./Comment.types"

export const Wrapper = styled.div`
  position: relative;

  display: flex;

  gap: var(--gap-md);

  width: 100%;
`
export const Avatar = styled(BaseAvatar)`
  flex-shrink: 0;
`
export const Content = styled.div<Pick<CommentProps, "depthLevel">>`
  display: grid;

  flex-shrink: 1;

  gap: var(--gap-5xs);

  ${({ depthLevel = 1 }) =>
    depthLevel > 1 &&
    css`
      margin-left: calc(${depthLevel} * var(--gap-md));
    `}
`
export const MainContent = styled.div<{ isReplied: boolean }>`
  display: grid;

  gap: var(--gap-5xs);

  border-radius: var(--radius-xs);

  ${({ isReplied }) =>
    isReplied &&
    css`
      padding: var(--gap-4xs) var(--gap-xs);

      background-color: var(--color-surface-base-secondary);
      border-left: 1px solid var(--color-border-accent);

      ${Name}, ${Text} {
        color: var(--color-text-secondary);
      }
    `}
`
export const Header = styled.div`
  display: flex;

  gap: var(--gap-5xs);

  align-items: center;
  justify-content: space-between;

  font: var(--font-body-medium-s);
`
export const Name = styled.div`
  overflow: hidden;

  color: var(--color-text-accent);
  text-overflow: clip;
  white-space: nowrap;
`
export const Date = styled.div`
  color: var(--color-text-tertiary);
`
export const Text = styled.div`
  font: var(--font-body-normal-s);
  color: var(--color-text-primary);
`
export const ReplyBtn = styled(Button)`
  width: fit-content;

  color: var(--color-text-secondary);

  .ant-btn-icon {
    font-size: 14px;
  }
`
export const ExtraContent = styled.div`
  position: absolute;
  top: 0;
  left: calc(100% + var(--gap-md));
`
export const Replys = styled.div`
  display: grid;

  gap: var(--gap-5xs);
`
