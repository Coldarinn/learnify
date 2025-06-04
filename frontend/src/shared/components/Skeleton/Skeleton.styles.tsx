import { css } from "@emotion/react"
import styled from "@emotion/styled"
import Skeleton from "antd/es/skeleton"

const { Avatar, Button, Image, Input, Node } = Skeleton
const styles = css`
  &.ant-skeleton,
  &.ant-skeleton.ant-skeleton-element {
    --ant-skeleton-color: rgba(244, 244, 244, 0);
    --ant-skeleton-color-gradient-end: rgba(244, 244, 244, 0);
    --ant-skeleton-gradient-from-color: var(--color-transparent-light-900);
    --ant-skeleton-gradient-to-color: #d5d5d5;
    --ant-skeleton-block-radius: var(--radius-xs);
  }
`
export const StyledSkeleton = styled(Skeleton)`
  ${styles}
`
export const StyledAvatar = styled(Avatar)`
  ${styles}
`
export const StyledButton = styled(Button)`
  ${styles}
`
export const StyledImage = styled(Image)`
  ${styles}
`
export const StyledInput = styled(Input)`
  ${styles}
`
export const StyledNode = styled(Node)`
  ${styles}
`
