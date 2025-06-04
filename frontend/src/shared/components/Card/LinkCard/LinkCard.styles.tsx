import styled from "@emotion/styled"

export const StyledCard = styled.div`
  position: relative;

  display: grid;

  gap: var(--gap-md);

  padding: var(--gap-xl);

  background-color: var(--color-surface-base-primary);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-tooltip);

  transition: 0.25s background-color ease-in-out;

  &:hover {
    background-color: var(--color-surface-base-primary-hover);
  }
`
export const Header = styled.div`
  display: flex;

  gap: var(--gap-5xs);

  align-items: center;
  justify-content: space-between;

  .card-arrow {
    flex-shrink: 0;

    font-size: 24px;

    transform: rotate(-90deg);
  }
`
export const Title = styled.div`
  display: flex;

  gap: var(--gap-3xs);

  align-items: center;

  font: var(--font-heading-xs);
  color: var(--color-text-primary);
`
export const Tags = styled.div`
  display: flex;

  flex-wrap: wrap;

  row-gap: var(--gap-5xs);

  .ant-tag {
    margin-inline-end: var(--gap-5xs);
  }
`
export const Text = styled.div`
  font: var(--font-caption-s);
  color: var(--color-text-secondary);
`
export const Link = styled.a`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;

  border: 1px solid transparent;
  border-radius: inherit;

  transition: 0.25s border-color ease-in-out;

  &:hover {
    border-color: var(--color-border-accent);
  }
`
