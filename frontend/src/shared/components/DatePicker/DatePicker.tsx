"use client"

import AntDatePicker from "antd/es/date-picker"
import React from "react"

import CalendarIcon from "@/shared/icons/calendar-bold.svg"

import { buddhistLocale } from "./buddhistLocale"
import { DatePickerStyles, Wrapper } from "./DatePicker.styles"
import { DatePickerBaseProps, DatePickerProps, DatePickerRef, RangePickerProps, RangePickerRef } from "./DatePicker.types"

const DatePickerBase = React.forwardRef<DatePickerRef | RangePickerRef, DatePickerBaseProps>((props, ref) => {
  const {
    label,
    caption,
    rootClassName = "",
    status,
    size = "m",
    className,
    component: Component,
    formControlStatus,
    isFormItem,
    isRequired,
    error,
    ...otherProps
  } = props

  const mappedSize = (
    {
      l: "large",
      m: "middle",
      s: "small",
    } as const
  )[size]

  return (
    <Wrapper
      className={className}
      size={size}
      status={status}
      label={label}
      caption={caption}
      formControlStatus={formControlStatus || status}
      isFormItem={isFormItem}
      isRequired={isRequired}
      error={error}
    >
      {/* @ts-ignore */}
      <Component
        ref={ref}
        rootClassName={`${DatePickerStyles} ${rootClassName}`}
        prefix={<CalendarIcon />}
        suffixIcon={null}
        showNow={false}
        locale={buddhistLocale}
        size={mappedSize}
        needConfirm={false}
        allowClear
        {...otherProps}
      />
    </Wrapper>
  )
})

const ForwardedDatePicker = React.forwardRef<DatePickerRef, DatePickerProps>((props, ref) => (
  <DatePickerBase ref={ref} component={AntDatePicker} {...props} />
))

const ForwardedRangePicker = React.forwardRef<RangePickerRef, RangePickerProps>((props, ref) => (
  <DatePickerBase ref={ref} component={AntDatePicker.RangePicker} separator="-" {...props} />
))

export const DatePicker = Object.assign(ForwardedDatePicker, { RangePicker: ForwardedRangePicker })
