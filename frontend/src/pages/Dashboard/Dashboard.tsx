import { reatomComponent } from "@reatom/react"

import { Form as BaseForm, FormProps } from "@/shared/components/Form"
import { FormInput } from "@/shared/components/Input"
import { FormSelect } from "@/shared/components/Select"
import { FormSwitch } from "@/shared/components/Switch"
import { FormTextArea } from "@/shared/components/TextArea"

import { createCourseAction } from "./api/api"
import { Form, SubmitBtn } from "./styles"
import { CreateCourseDto } from "./types"

export const Dashboard = reatomComponent(() => {
  const onFinish: FormProps<CreateCourseDto>["onFinish"] = async (values) => {
    console.log("Success:", values)
    const res = await createCourseAction(values)
    console.log("res: ", res)
  }

  const onFinishFailed: FormProps<CreateCourseDto>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo)
  }

  const [form] = BaseForm.useForm<CreateCourseDto>()

  return (
    <BaseForm className={Form} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
      <FormInput<CreateCourseDto>
        input={{ isRequired: true, label: "Course Name" }}
        formItem={{ name: "name", rules: [{ required: true, message: "Please input course name" }] }}
      />

      <FormTextArea<CreateCourseDto> formItem={{ name: "description" }} textArea={{ label: "Course Description" }} />

      <FormSwitch<CreateCourseDto> formItem={{ name: "includeVideo" }} switch={{ children: "Include video" }} />

      <FormSelect<CreateCourseDto>
        select={{ isRequired: true, label: "Difficulty Level", options: difficultyLevelOptions }}
        formItem={{ name: "difficultyLevel", rules: [{ required: true, message: "Please select difficulty Level" }] }}
      />

      <FormInput<CreateCourseDto> input={{ label: "Category" }} formItem={{ name: "category", validateStatus: "" }} />

      <SubmitBtn size="s" htmlType="submit">
        Create
      </SubmitBtn>
    </BaseForm>
  )
})

const difficultyLevelOptions = [
  {
    label: "Beginner",
    value: "beginner",
  },
  {
    label: "Intermediate",
    value: "intermediate",
  },
  {
    label: "Advanced",
    value: "advanced",
  },
]
