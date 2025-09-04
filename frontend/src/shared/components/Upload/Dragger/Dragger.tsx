import React from "react"

import UploadIcon from "@/shared/icons/upload-cloud.svg"

import { FileButton } from "../FileButton"
import { UploadRef } from "../Upload.types"
import { StyledDragger, Text } from "./Dragger.styles"
import { DraggerProps } from "./Dragger.types"

export const Dragger = React.forwardRef<UploadRef, DraggerProps>((props, ref) => {
  const { children, ...otherProps } = props

  return (
    <StyledDragger ref={ref} itemRender={(_node, file, _list, actions) => <FileButton file={file} actions={actions} />} {...otherProps}>
      {children || (
        <>
          <UploadIcon className="dragger-upload-icon" />
          <Text>
            Drag and drop the document or click <span> on the </span> button
          </Text>
        </>
      )}
    </StyledDragger>
  )
})
