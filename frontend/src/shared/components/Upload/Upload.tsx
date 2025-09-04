import React from "react"

import { Dragger } from "./Dragger"
import { FileButton } from "./FileButton"
import { StyledUpload } from "./Upload.styles"
import { UploadProps, UploadRef } from "./Upload.types"

const UploadComponent = React.forwardRef<UploadRef, UploadProps>((props, ref) => {
  return <StyledUpload ref={ref} {...props} />
})

export const Upload = Object.assign(UploadComponent, {
  Dragger,
  FileButton,
})
