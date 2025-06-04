import type { GetProp } from "antd/es/_util/type"

import { UploadProps } from "../Upload.types"

type ItemRenderParams = Parameters<GetProp<UploadProps, "itemRender">>
export type FileButtonProps = {
  file: ItemRenderParams[1]
  actions: ItemRenderParams[3]
  size?: "s" | "m" | "l"
  isLoading?: boolean
}
