export type { CascaderRef } from "antd/es/cascader"
import type { CascaderProps as AntCascaderProps, DefaultOptionType } from "antd/es/cascader"

import { ControlWrapperProps } from "@/shared/components/ControlWrapper"

export type CascaderProps<
  OptionType extends DefaultOptionType = DefaultOptionType,
  ValueField extends keyof OptionType = keyof OptionType,
  Multiple extends boolean = boolean,
> = React.PropsWithChildren<
  Omit<AntCascaderProps<OptionType, ValueField, Multiple>, "status" | "children" | "size"> & ControlWrapperProps & { status?: "success" | "error" }
>
