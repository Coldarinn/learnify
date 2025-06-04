import React from "react"

import { Form, FormItemProps } from "@/shared/components/Form"

import { Search } from "./Search"
import { SearchProps, SearchRef } from "./Search.types"

type Props<T> = {
  formItem?: FormItemProps<T>
  search?: SearchProps
}

const SearchComponent = React.forwardRef<SearchRef, SearchProps>((props, ref) => {
  const { status, errors } = Form.Item.useStatus()
  const isFormItem = status !== undefined
  const error = errors.join("; ")

  return <Search ref={ref} isFormItem={isFormItem} error={error} formControlStatus={status} {...props} />
})

export const FormSearch = <T,>(props: Props<T>) => {
  return (
    <Form.Item<T> noStyle {...props.formItem}>
      <SearchComponent {...props.search} isRequired={props.formItem?.required} />
    </Form.Item>
  )
}
