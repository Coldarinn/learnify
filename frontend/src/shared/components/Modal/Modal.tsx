import AntModal from "antd/es/modal"

import { Button } from "@/shared/components/Button"
import CloseIcon from "@/shared/icons/close.svg"

import { StyledModal } from "./Modal.styles"
import { ModalProps } from "./Modal.types"

export const Modal = (props: ModalProps) => {
  const { rootClassName = "", ...otherProps } = props

  return (
    <AntModal
      rootClassName={`${StyledModal} ${rootClassName}`}
      centered
      footer={<ModalFooter onCancel={props.onCancel} onOk={props.onOk} />}
      closeIcon={<Button type="extra-secondary" size="xs" icon={<CloseIcon />} tabIndex={-1} />}
      destroyOnHidden
      {...otherProps}
    />
  )
}

const ModalFooter = (props: Pick<ModalProps, "onCancel" | "onOk">) => (
  <>
    <Button type="extra-primary" size="s" onClick={props.onCancel}>
      Закрыть
    </Button>
    <Button size="s" onClick={props.onOk}>
      Ок
    </Button>
  </>
)
