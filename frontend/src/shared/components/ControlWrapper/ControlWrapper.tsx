import { Caption, Label, Required, Wrapper } from "./ControlWrapper.styles"
import { ControlWrapperProps } from "./ControlWrapper.types"

export const ControlWrapper = (props: ControlWrapperProps) => {
  const { className, view = "vertical", size = "m", formControlStatus, label, isFormItem, isRequired, error, caption, children } = props

  return (
    <Wrapper className={className} view={view} size={size} formControlStatus={formControlStatus}>
      {label && (
        <Label className="form-control-label">
          {isRequired && <Required className="form-control-label-required">*</Required>}
          {label}
        </Label>
      )}
      {children}
      {(isFormItem || error || caption) && <Caption className={`form-control-caption ${error ? "error" : ""}`}>{error || caption}</Caption>}
    </Wrapper>
  )
}
