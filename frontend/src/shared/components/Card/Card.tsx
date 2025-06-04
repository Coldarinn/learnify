import { Tag } from "@/shared/components/Tag"

import { Cover, MainContent, StyledCard, Tags, Title, Date, Text, sizeStyles } from "./Card.styles"
import { CardProps } from "./Card.types"
import { LinkCard } from "./LinkCard"

export const Card = (props: CardProps) => {
  const { cover, tags, date, title, text, footer, size = "m", className } = props

  const styles = sizeStyles[size]

  return (
    <StyledCard className={className} css={styles}>
      {cover && <Cover className="card-cover">{typeof cover === "string" ? <img src={cover} alt="изображение" /> : cover}</Cover>}
      {tags && tags?.length > 0 && <Tags className="card-tags">{tags?.map((tag, idx) => <Tag key={idx} size="s" {...tag} />)}</Tags>}
      <MainContent className="card-main-content">
        {date && <Date className="card-date">{date}</Date>}
        {title && <Title className="card-title">{title}</Title>}
        {text && <Text className="card-text">{text}</Text>}
      </MainContent>
      {footer && footer}
    </StyledCard>
  )
}

Card.Link = LinkCard
