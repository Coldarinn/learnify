import { Avatar } from "@/shared/components/Avatar"
import { Form as BaseForm, FormProps } from "@/shared/components/Form"
import { FormTextArea } from "@/shared/components/TextArea"
import { DraggerProps, FormUpload, Upload, UploadProps } from "@/shared/components/Upload"
import PaperclipIcon from "@/shared/icons/paperclip.svg"

import { CharsCount, Footer, FormControls, PaperclipBtn, StyledForm, SubmitBtn, TextAreaWrapper, Wrapper } from "./Form.styles"
import { CommentFormProps } from "./Form.types"

type FieldType = {
  message?: string
  upload?: UploadProps["fileList"]
}

export const Form = (props: CommentFormProps) => {
  const { className, avatar, form: formProp, buttonText = "Отправить" } = props

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values)
  }

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo)
  }

  const [form] = BaseForm.useForm<FieldType>()
  const message = BaseForm.useWatch("message", form)
  const fileList = BaseForm.useWatch("upload", form)

  return (
    <Wrapper className={className}>
      <Avatar className="comment-form-avatar" size="large" {...avatar} />

      <BaseForm
        form={form}
        className={`${StyledForm} comment-form-form`}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        {...formProp}
      >
        <FormUpload.Dragger<FieldType>
          formItem={{ name: "upload", valuePropName: "fileList", getValueFromEvent: normFile }}
          dragger={{ multiple: true, showUploadList: false }}
        >
          <FormControls onClick={(e) => e.stopPropagation()}>
            <TextAreaWrapper className="comment-form-text-area-wrapper">
              <FormTextArea<FieldType>
                formItem={{
                  name: "message",
                }}
                textArea={{
                  isFormItem: false,
                  placeholder: "Напишите сообщение...",
                  maxLength: 200,
                }}
              />

              <FormUpload
                formItem={{ name: "upload", valuePropName: "fileList", getValueFromEvent: normFile }}
                upload={{ className: "comment-form-upload-button", multiple: true, showUploadList: false }}
              >
                <PaperclipBtn type="button">
                  <PaperclipIcon />
                </PaperclipBtn>
              </FormUpload>
            </TextAreaWrapper>

            <CharsCount className="comment-form-chars">{message?.length || "0"}/200</CharsCount>

            <Footer>
              <FormUpload
                formItem={{ name: "upload", valuePropName: "fileList", getValueFromEvent: normFile }}
                upload={{
                  className: "comment-form-file-list",
                  fileList,
                  itemRender: (_node, file, _list, actions) => <Upload.FileButton file={file} actions={actions} />,
                }}
              />
              <SubmitBtn size="s" htmlType="submit">
                {buttonText}
              </SubmitBtn>
            </Footer>
          </FormControls>
        </FormUpload.Dragger>
      </BaseForm>
    </Wrapper>
  )
}

const normFile: DraggerProps["onChange"] = (event) => (Array.isArray(event) ? event : event.fileList)
