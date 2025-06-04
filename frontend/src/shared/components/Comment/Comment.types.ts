import { AvatarProps } from "@/shared/components/Avatar"

type Comment = {
  avatar?: AvatarProps
  name?: React.ReactNode
  date?: string
  text?: string
  depthLevel?: number
  canBeReplied?: boolean
  onReply?: () => void
  extraContent?: React.ReactNode
}

export type CommentProps = Comment & {
  replys?: Comment[]
}
