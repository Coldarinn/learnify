import { TagProps } from "@/shared/components/Tag"

export type CardProps = {
  cover?: React.ReactNode
  tags?: TagProps[]
  date?: string
  title?: React.ReactNode
  text?: React.ReactNode
  footer?: React.ReactNode
  size?: "m" | "l"
  className?: string
}
