import { LoadingOutlined } from "@ant-design/icons"
import Spin from "antd/es/spin"

import FileIcon from "@/shared/icons/file-bold.svg"
import TrashIcon from "@/shared/icons/trash-2-bold.svg"

import { RemoveBtn, StyledFileButton } from "./FileButton.styles"
import { FileButtonProps } from "./FileButton.types"

export const FileButton = (props: FileButtonProps) => {
  const { file, actions, size = "m", isLoading: isLoadingProp } = props

  const isLoading = isLoadingProp || file.status === "uploading"

  return (
    <StyledFileButton size={size}>
      <Spin spinning={isLoading} indicator={<LoadingOutlined spin />}>
        <FileIcon />
        <span>{file.name}</span>
        <RemoveBtn type="button" onClick={actions.remove}>
          <TrashIcon />
        </RemoveBtn>
      </Spin>
    </StyledFileButton>
  )
}
