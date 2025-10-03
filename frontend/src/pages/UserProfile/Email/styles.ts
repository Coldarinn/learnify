import styled from "@emotion/styled"

export const Header = styled.div`
  padding-bottom: var(--gap-md);

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid var(--color-border-tertiary);
`
export const Titles = styled.div`
  display: grid;
  gap: var(--gap-5xs);
`
export const Buttons = styled.div`
  display: flex;
  gap: var(--gap-xs);
`
export const Title = styled.div`
  font: var(--font-heading-xs);
`
export const Subtitle = styled.div`
  font: var(--font-body-regular-m);
  color: var(--color-text-secondary);
`
export const Row = styled.div`
  padding-top: var(--gap-md);

  display: grid;
  grid-template-columns: minmax(200px, 280px) minmax(400px, 512px);

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-border-tertiary);
  }
`
export const RowLabel = styled.div`
  padding-top: var(--gap-xs);

  font: var(--font-caption-l);
`
