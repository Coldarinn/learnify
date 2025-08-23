import { Course } from "@/shared/types/course"
import { action, withAsync, wrap } from "@reatom/core"

import { CreateCourseDto } from "../types"
import { PROMPT } from "./prompt"

// ===== Creating course =====

export const createCourseAction = action(async (dto: CreateCourseDto) => {
  await wrap(
    puter.ai.chat(PROMPT + JSON.stringify(dto), { model: "gpt-5-nano" }).then((response) => {
      const course: Course = JSON.parse(response.message.content)
      console.log("course: ", course)
      puter.ai.txt2img(course.bannerImagePrompt).then((imageElement) => {
        console.log("base64: ", imageElement.outerHTML.match(/src=["']([^"']+)["']/)?.[1])
      })
    })
  )

  // return structure
}).extend(withAsync())
