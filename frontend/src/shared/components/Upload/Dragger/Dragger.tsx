import React from "react"

import UploadIcon from "@/shared/icons/upload-cloud.svg"

import { DraggerProps } from "./Dragger.types"
import { FileButton } from "../FileButton"
import { UploadRef } from "../Upload.types"
import { StyledDragger, Text } from "./Dragger.styles"

export const Dragger = React.forwardRef<UploadRef, DraggerProps>((props, ref) => {
  const { children, ...otherProps } = props

  return (
    <StyledDragger ref={ref} itemRender={(_node, file, _list, actions) => <FileButton file={file} actions={actions} />} {...otherProps}>
      {children || (
        <>
          <UploadIcon className="dragger-upload-icon" />
          <Text>
            Перетащите документ или нажмите <span>на кнопку</span>
          </Text>
        </>
      )}
    </StyledDragger>
  )
})
