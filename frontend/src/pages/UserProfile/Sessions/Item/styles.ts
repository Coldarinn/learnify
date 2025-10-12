import styled from "@emotion/styled"

export const Wrapper = styled.section`
  padding: var(--gap-md) 0;

  display: flex;
  align-items: center;
  gap: var(--gap-md);

  .icon {
    font-size: 24px;
  }
`
export const Content = styled.div`
  display: grid;
  gap: var(--gap-5xs);
`
export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: var(--gap-3xs);

  font: var(--font-subheading-m);
  text-transform: capitalize;
`
export const Status = styled.div`
  padding: var(--gap-5xs) var(--gap-3xs);

  display: flex;
  align-items: center;
  gap: var(--gap-5xs);

  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-2xs);

  font: var(--font-caption-s);
  text-transform: none;

  &::before {
    content: "";

    display: inline-block;
    width: 6px;
    height: 6px;

    border-radius: var(--radius-circle);
    background: var(--color-icon-success);
  }
`
export const Location = styled.div`
  display: flex;
  align-items: center;
  gap: var(--gap-5xs);

  font: var(--font-caption-m);
  color: var(--color-text-secondary);

  span {
    font-size: 24px;
    line-height: 18px;
    font-weight: 700;
  }
`
