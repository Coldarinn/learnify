import AntTable, { type TableProps } from "antd/es/table"

import { styles } from "./Table.styles"

export const Table = (<T,>(props: TableProps<T>) => {
  const { rootClassName = "", ...otherProps } = props

  return <AntTable<T> rootClassName={`${styles} ${rootClassName}`} {...otherProps} />
}) as typeof AntTable

Object.assign(Table, AntTable)
