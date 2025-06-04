import React from "react"

import MagnifierIcon from "@/shared/icons/magnifier.svg"

import { Icon, StyledSearch } from "./Search.styles"
import { SearchProps, SearchRef } from "./Search.types"

export const Search = React.forwardRef<SearchRef, SearchProps>((props, ref) => {
  const { className = "" } = props

  return (
    <StyledSearch
      ref={ref}
      className={`custom-search ${className}`}
      classNames={{ input: "custom-input-search" }}
      prefix={
        <Icon className="anticon" size={props.size}>
          <MagnifierIcon />
        </Icon>
      }
      {...props}
    />
  )
})
