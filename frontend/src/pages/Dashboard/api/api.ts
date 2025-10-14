import { Course } from "@/shared/types/course"
import { action, withAsync, wrap } from "@reatom/core"

import { CreateCourseDto } from "../types"
import { PROMPT } from "./prompt"

export const createCourseAction = action(async (dto: CreateCourseDto) => {
  const content = await wrap(
    puter.ai.chat(PROMPT + JSON.stringify(dto), { model: "gpt-5-nano" }).then<Course>((response) => JSON.parse(response.message.content))
  )
  if (!content) throw new Error("Failed to create course")

  const bannerBase64 = await wrap(
    puter.ai.txt2img(content.bannerImagePrompt).then((imageElement) => imageElement.outerHTML.match(/src=["']([^"']+)["']/)?.[1])
  )

  if (!bannerBase64) throw new Error("Failed to create course")

  return { content, bannerBase64 }
}).extend(withAsync())
