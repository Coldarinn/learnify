import ArrowIcon from "@/shared/icons/arrow-alt.svg"

import { StyledPagination } from "./Pagination.styles"
import { PaginationProps } from "./Pagination.types"

export const Pagination = (props: PaginationProps) => {
  const { showQuickJumper: showQuickJumperProp, ...otherProps } = props

  let showQuickJumper: PaginationProps["showQuickJumper"] = showQuickJumperProp

  if (typeof showQuickJumperProp === "object" || showQuickJumperProp === undefined) {
    showQuickJumper = {
      goButton: "На страницу",
      ...showQuickJumperProp,
    }
  }

  return (
    <StyledPagination
      hideOnSinglePage
      showSizeChanger={false}
      showQuickJumper={showQuickJumper}
      prevIcon={<ArrowIcon />}
      nextIcon={<ArrowIcon />}
      {...otherProps}
    />
  )
}
