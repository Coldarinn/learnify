import AntModal from "antd/es/modal"

import { Button } from "@/shared/components/Button"

import CloseIcon from "@/shared/icons/close.svg"

import { StyledModal } from "./Modal.styles"
import { ModalProps } from "./Modal.types"

export const Modal = (props: ModalProps) => {
  const { rootClassName = "", okText, cancelText, cancelButtonProps, okButtonProps, ...otherProps } = props

  return (
    <AntModal
      rootClassName={`${StyledModal} ${rootClassName}`}
      centered
      footer={
        <ModalFooter
          onCancel={props.onCancel}
          onOk={props.onOk}
          okText={okText}
          cancelText={cancelText}
          okButtonProps={okButtonProps}
          cancelButtonProps={cancelButtonProps}
        />
      }
      closeIcon={<CloseIcon />}
      destroyOnHidden
      {...otherProps}
    />
  )
}

const ModalFooter = (props: Pick<ModalProps, "onCancel" | "onOk" | "okText" | "cancelText" | "okButtonProps" | "cancelButtonProps">) => {
  const { okText = "Ok", cancelText = "Cancel", onCancel, onOk, okButtonProps, cancelButtonProps } = props

  return (
    <>
      <Button {...cancelButtonProps} type="extra-primary" size="s" onClick={onCancel}>
        {cancelText}
      </Button>
      <Button {...okButtonProps} type="main-primary" size="s" onClick={onOk}>
        {okText}
      </Button>
    </>
  )
}
