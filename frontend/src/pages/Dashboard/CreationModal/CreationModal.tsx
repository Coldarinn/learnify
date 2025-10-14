import { useApiAction } from "@/shared/api"
import { reatomComponent } from "@reatom/react"
import { MouseEvent } from "react"

import { Button } from "@/shared/components/Button"
import { Form as BaseForm, FormProps } from "@/shared/components/Form"
import { FormInput } from "@/shared/components/Input"
import { Modal, ModalProps } from "@/shared/components/Modal"
import { FormSelect } from "@/shared/components/Select"
import { FormSwitch } from "@/shared/components/Switch"
import { FormTextArea } from "@/shared/components/TextArea"

import { CreateCourseDto } from "../types"
import { createCourseAction } from "./api"
import { difficultyLevelOptions } from "./difficultyLevelOptions"
import { Footer, FormStyles, SwitchStyles } from "./styles"

type Props = Pick<ModalProps, "open" | "onCancel">

export const CreationModal = reatomComponent((props: Props) => {
  const isCreating = !createCourseAction.ready()

  const createCourse = useApiAction(createCourseAction, {
    success: { message: "Course created successfully" },
  })

  const onFinish: FormProps<CreateCourseDto>["onFinish"] = async (values) => {
    await createCourse(values).then(() => {
      props.onCancel?.({} as MouseEvent<HTMLButtonElement>)
    })
  }

  return (
    <Modal {...props} title="Create new course using AI" footer={null} maskClosable={!isCreating} closable={!isCreating}>
      <BaseForm className={FormStyles} onFinish={onFinish}>
        <FormInput<CreateCourseDto>
          input={{ isRequired: true, label: "Name", size: "l" }}
          formItem={{ name: "name", rules: [{ required: true, message: "Please input course name" }] }}
        />

        <FormTextArea<CreateCourseDto>
          formItem={{ name: "description" }}
          textArea={{ label: "Description", size: "l", maxLength: 300, showCount: true }}
        />

        <FormSwitch<CreateCourseDto> formItem={{ name: "includeVideo" }} switch={{ children: "Include video", className: SwitchStyles }} />

        <FormSelect<CreateCourseDto>
          select={{ isRequired: true, label: "Difficulty Level", options: difficultyLevelOptions, size: "l" }}
          formItem={{ name: "difficultyLevel", rules: [{ required: true, message: "Please select difficulty Level" }] }}
        />

        <Footer>
          <Button type="extra-primary" onClick={props.onCancel} loading={isCreating}>
            Cancel
          </Button>
          <Button htmlType="submit" loading={isCreating}>
            Create
          </Button>
        </Footer>
      </BaseForm>
    </Modal>
  )
})
