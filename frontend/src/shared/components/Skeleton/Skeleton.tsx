import { StyledAvatar, StyledButton, StyledImage, StyledInput, StyledNode, StyledSkeleton } from "./Skeleton.styles"
import { SkeletonProps } from "./Skeleton.types"

export const Skeleton = (props: SkeletonProps) => {
  return <StyledSkeleton paragraph={false} {...props} />
}

Skeleton.Avatar = StyledAvatar
Skeleton.Button = StyledButton
Skeleton.Image = StyledImage
Skeleton.Input = StyledInput
Skeleton.Node = StyledNode
