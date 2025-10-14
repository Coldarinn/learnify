import { gqlClient } from "@/shared/api"
import { Course } from "@/shared/types/course"
import { gql } from "@apollo/client"
import { action, withAsync, wrap } from "@reatom/core"

import { CreateCourseDto } from "../../types"
import { PROMPT } from "./prompt"

export const createCourseAction = action(async (dto: CreateCourseDto) => {
  const contentData = await wrap(
    puter.ai.chat(PROMPT + JSON.stringify(dto), { model: "gpt-5-nano" }).then<Course>((response) => JSON.parse(response.message.content))
  )
  if (!contentData) throw new Error("Failed to create course")

  const { bannerImagePrompt, ...content } = contentData

  const bannerBase64 = await wrap(
    puter.ai.txt2img(bannerImagePrompt).then((imageElement) => imageElement.outerHTML.match(/src=["']([^"']+)["']/)?.[1])
  )

  if (!bannerBase64) throw new Error("Failed to create course")

  await wrap(
    gqlClient.mutate({
      mutation: gql`
        mutation createCourse($data: CreateCourseInput!) {
          createCourse(data: $data)
        }
      `,
      variables: {
        data: {
          ...content,
          bannerBase64,
        },
      },
    })
  )
}).extend(withAsync())
