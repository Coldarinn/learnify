import styled from "@emotion/styled"
import Breadcrumb from "antd/es/breadcrumb"

export const StyledBreadcrumb = styled(Breadcrumb)`
  --ant-breadcrumb-separator-margin: var(--gap-3xs);

  font: var(--font-subheading-l);
  color: var(--color-text-secondary);

  a {
    padding: 0;

    &:hover {
      color: var(--color-text-accent-hover);

      background: transparent;
    }
  }

  li:last-of-type > * {
    color: var(--color-text-accent);
  }
`
