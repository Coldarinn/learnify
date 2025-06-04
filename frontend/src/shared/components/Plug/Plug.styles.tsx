import styled from "@emotion/styled"

export const Wrapper = styled.div`
  display: flex;

  flex-direction: column;

  gap: var(--gap-xl);

  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background-color: inherit;
  border-radius: inherit;

  img {
    min-height: 0;
  }
`
export const Text = styled.div`
  font: var(--font-subheading-xl);
  color: var(--color-text-primary);
`
