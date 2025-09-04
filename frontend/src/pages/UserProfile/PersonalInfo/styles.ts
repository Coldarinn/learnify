import styled from "@emotion/styled"

import { Avatar as BaseAvatar } from "@/shared/components/Avatar"

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
export const Inputs = styled.div`
  display: grid;
  gap: var(--gap-xl);
  grid-template-columns: repeat(2, minmax(0, 1fr));

  > * {
    width: 100%;
  }
`
export const UploadContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: var(--gap-3xs);

  .ant-upload-wrapper {
    flex-grow: 1;
  }
`
export const Avatar = styled(BaseAvatar)`
  width: 64px;
  height: 64px;
  flex-shrink: 0;
`
