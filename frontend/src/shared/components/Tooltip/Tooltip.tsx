import AntTooltip from "antd/es/tooltip"
import { useState } from "react"
import type { ReactNode } from "react"

import { Button } from "@/shared/components/Button"
import CloseIcon from "@/shared/icons/close.svg"

import { Title, TooltipStyles } from "./Tooltip.styles"
import { TooltipProps } from "./Tooltip.types"

export const Tooltip = (props: TooltipProps) => {
  const { title: titleProp, rootClassName = "", open: openProp, onOpenChange, closable = true, ...otherProps } = props

  const [internalOpen, setInternalOpen] = useState(false)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : internalOpen

  const handleClose = () => {
    if (!isControlled) setInternalOpen(false)
    onOpenChange?.(false)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isControlled) setInternalOpen(nextOpen)
    onOpenChange?.(nextOpen)
  }

  const title = typeof titleProp === "function" ? titleProp() : titleProp

  const content: ReactNode = closable ? (
    <Title className="tooltip-title">
      <span>{title}</span>
      <Button type="extra-secondary" size="xs" icon={<CloseIcon />} onClick={handleClose} />
    </Title>
  ) : (
    title
  )

  return (
    <AntTooltip open={open} onOpenChange={handleOpenChange} title={content} rootClassName={`${TooltipStyles} ${rootClassName}`} {...otherProps} />
  )
}
