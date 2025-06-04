import "dayjs/locale/ru"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

import ArrowIcon from "@/shared/icons/arrow-reply.svg"

import { Wrapper, MainContent, Header, Name, Date as StyledDate, Text, ReplyBtn, ExtraContent, Avatar, Content, Replys } from "./Comment.styles"
import { CommentProps } from "./Comment.types"
import { Form } from "./Form"

dayjs.locale("ru")
dayjs.extend(relativeTime)

export const Comment = (props: CommentProps) => {
  const { avatar, name, date, text, depthLevel = 0, canBeReplied = true, onReply, extraContent, replys = [] } = props

  const isReplied = replys?.length > 0 && depthLevel > 0
  const formattedDate = dayjs(date).from(new Date())

  return (
    <>
      <Wrapper>
        {depthLevel < 2 && <Avatar className="comment-avatar" size="large" {...avatar} />}

        <Content className="comment-content" depthLevel={depthLevel}>
          <MainContent className="comment-main-content" isReplied={isReplied}>
            <Header className="comment-header">
              <Name className="comment-name">{name}</Name>
              {!isReplied && <StyledDate className="comment-date">{formattedDate}</StyledDate>}
            </Header>

            <Text className="comment-text">{text}</Text>
            {!isReplied && canBeReplied && (
              <ReplyBtn className="comment-reply-btn" type="extra-secondary" size="xs" icon={<ArrowIcon />} onClick={onReply}>
                Ответить
              </ReplyBtn>
            )}
          </MainContent>

          {replys.length > 0 && depthLevel > 0 && (
            <Replys className="comment-replys">
              {replys.map((reply, idx) => (
                <Comment key={idx} {...reply} depthLevel={depthLevel + 1} />
              ))}
            </Replys>
          )}
        </Content>

        {extraContent && <ExtraContent className="comment-extra-content">{extraContent}</ExtraContent>}
      </Wrapper>

      {replys.length > 0 && !depthLevel && (
        <Replys className="comment-replys">
          {replys.map((reply, idx) => (
            <Comment key={idx} {...reply} depthLevel={depthLevel + 1} />
          ))}
        </Replys>
      )}
    </>
  )
}

Comment.Form = Form
