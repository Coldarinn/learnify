import { TagProps } from "@/shared/components/Tag"

export type LinkCardProps = {
  title?: React.ReactNode
  count?: string | number
  tags?: TagProps[]
  text?: React.ReactNode
  extraContent?: React.ReactNode
  link?: React.ReactNode
  className?: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
}
