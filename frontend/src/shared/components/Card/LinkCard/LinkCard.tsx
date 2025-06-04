import { Badge } from "@/shared/components/Badge"
import { Tag } from "@/shared/components/Tag"
import ArrowIcon from "@/shared/icons/arrow-alt.svg"

import { StyledCard, Tags, Title, Text, Link, Header } from "./LinkCard.styles"
import { LinkCardProps } from "./LinkCard.types"

export const LinkCard = (props: LinkCardProps) => {
  const { title, count, tags, text, extraContent, link, className, onClick } = props

  return (
    <StyledCard className={className} onClick={onClick}>
      <Header className="card-header">
        <Title className="card-title">
          {title}
          {count && <Badge size="l" color="green" count={count} bright />}
        </Title>
        <ArrowIcon className="card-arrow" />
      </Header>
      <Tags className="card-tags">{tags?.map((tag, idx) => <Tag key={idx} size="s" {...tag} />)}</Tags>
      {text && <Text className="card-text">{text}</Text>}
      {extraContent && <div className="card-extra-content">{extraContent}</div>}
      {typeof link === "string" ? <Link className="card-link" href={link} /> : link && link}
    </StyledCard>
  )
}
