import { getUserAction, userAtom } from "@/entities/user"
import { useApiAction } from "@/shared/api"
import { reatomComponent } from "@reatom/react"
import { UploadFile } from "antd"
import { useMemo, useState } from "react"

import { Button } from "@/shared/components/Button"
import { Form } from "@/shared/components/Form"
import { FormInput } from "@/shared/components/Input"
import { useNotification } from "@/shared/components/Notification"
import { FormUpload } from "@/shared/components/Upload"

import { updateAvatarAction, updateProfileAction } from "./api"
import { Avatar, Buttons, Header, Inputs, Row, RowLabel, Subtitle, Title, Titles, UploadContent } from "./styles"
import { PersonalInfoType } from "./types"

export const PersonalInfo = reatomComponent(() => {
  const notify = useNotification()

  const user = userAtom()
  const initialValues: Partial<PersonalInfoType> = {
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    avatar: {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: user.avatarUrl || "",
    },
  }

  const [form] = Form.useForm<PersonalInfoType>()

  const file = Form.useWatch("avatar", form)

  const avatarSrc = useMemo(() => {
    if (!file) return undefined
    if (file.url) return file.url
    return URL.createObjectURL(file as unknown as Blob)
  }, [file])

  const getValueFromEvent = (e: { file: UploadFile }) => {
    if (!["jpg", "jpeg", "png", "svg", "gif"].includes(e.file.type?.split("/")?.[1] || "")) {
      notify.error({ message: "Only .jpeg, .png, .svg, .gif images are allowed." })
      return file
    }

    return e.file
  }

  const updateAvatar = useApiAction(updateAvatarAction)
  const updateProfile = useApiAction(updateProfileAction)
  const [isUpdating, setIsUpdating] = useState(false)

  const onFinish = async (values: PersonalInfoType) => {
    try {
      if (isUpdating) return

      setIsUpdating(true)

      const actions = []

      const profileFields: Partial<PersonalInfoType> = {}

      if (form.isFieldTouched("avatar")) {
        console.log("values.avatar: ", values.avatar)
        const formData = new FormData()
        formData.append("avatar", values.avatar as unknown as Blob)
        actions.push((async () => updateAvatar(formData))())
      }

      if (form.isFieldTouched("username")) {
        profileFields.username = values.username
      }

      if (form.isFieldTouched("firstName")) {
        profileFields.firstName = values.firstName
      }

      if (form.isFieldTouched("lastName")) {
        profileFields.lastName = values.lastName
      }

      if (Object.keys(profileFields).length > 0) {
        actions.push(async () => updateProfile(profileFields))
      }

      console.log("actions: ", actions)
      const response = await Promise.allSettled(actions)

      if (response.filter((item) => item.status === "fulfilled").length > 0) {
        await getUserAction()
      }
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Form<PersonalInfoType> form={form} onFinish={onFinish} initialValues={initialValues}>
      <Header>
        <Titles>
          <Title>Personal info</Title>
          <Subtitle>Update your photo and personal details here</Subtitle>
        </Titles>

        <Buttons>
          <Button type="extra-outline" size="l" onClick={() => form.resetFields()} loading={isUpdating}>
            Reset
          </Button>

          <Form.Item>
            <Button htmlType="submit" size="l" loading={isUpdating}>
              Save
            </Button>
          </Form.Item>
        </Buttons>
      </Header>

      <Row>
        <RowLabel>Username</RowLabel>
        <FormInput<PersonalInfoType>
          input={{
            placeholder: "username",
            size: "l",
          }}
          formItem={{
            name: "username",
            rules: [{ required: true, message: "Please input your username" }],
          }}
        />
      </Row>

      <Row>
        <RowLabel>Name</RowLabel>
        <Inputs>
          <FormInput<PersonalInfoType>
            input={{
              placeholder: "first name",
              size: "l",
            }}
            formItem={{
              name: "firstName",
              rules: [{ required: true, message: "Please input your first name" }],
            }}
          />
          <FormInput<PersonalInfoType>
            input={{
              placeholder: "last name",
              size: "l",
            }}
            formItem={{
              name: "lastName",
              rules: [{ required: true, message: "Please input your last name" }],
            }}
          />
        </Inputs>
      </Row>

      <Row>
        <RowLabel>Your photo</RowLabel>
        <UploadContent>
          <Avatar src={avatarSrc} />
          <FormUpload.Dragger<PersonalInfoType>
            dragger={{
              showUploadList: false,
              beforeUpload: () => false,
            }}
            formItem={{
              name: "avatar",
              valuePropName: "file",
              getValueFromEvent,
            }}
          />
        </UploadContent>
      </Row>
    </Form>
  )
})
