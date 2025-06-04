import { css, type SerializedStyles } from "@emotion/react"
import styled from "@emotion/styled"
import Checkbox from "antd/es/checkbox"

import { CheckboxProps } from "./Checkbox.types"

export const Wrapper = styled.div<Pick<CheckboxProps, "status">>`
  --checkbox-size: 24px;
  --gap: var(--gap-5xs);
  --font: var(--font-body-medium-m);

  position: relative;

  display: inline-block;

  &:has(.checkbox-caption) {
    padding-bottom: calc(12px + var(--gap-6xs));
  }

  ${({ status }) => {
    const formStatus = status || ""

    switch (formStatus) {
      case "success":
        return css`
          .checkbox-caption {
            color: var(--color-border-success);
          }
        `
      case "error":
        return css`
          .checkbox-caption {
            color: var(--color-border-critical);
          }
        `
      default:
        break
    }
  }}
`
export const Body = styled.div`
  display: inline-flex;

  gap: var(--gap-6xs);

  align-items: center;
`
export const Children = styled.div`
  font: var(--font);
  color: var(--color-text-primary);
`
export const Caption = styled.div<{ withChildren?: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;

  max-width: 100%;
  padding-left: ${({ withChildren }) => (withChildren ? "calc(var(--checkbox-size) + var(--gap))" : 0)};
  overflow: hidden;

  font: var(--font-caption-xs);
  color: var(--color-text-secondary);
  text-overflow: ellipsis;
  white-space: nowrap;

  transform: translateY(-100%);
`
export const StyledCheckbox = styled(Checkbox)`
  --image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.1966 2.25H12.3034C14.4507 2.24999 16.1335 2.24998 17.4466 2.42651C18.7905 2.6072 19.851 2.98426 20.6834 3.81664C21.5157 4.64902 21.8928 5.70951 22.0735 7.05345C22.25 8.36646 22.25 10.0493 22.25 12.1966V12.3034C22.25 14.4507 22.25 16.1335 22.0735 17.4466C21.8928 18.7905 21.5157 19.851 20.6834 20.6834C19.851 21.5157 18.7905 21.8928 17.4466 22.0735C16.1335 22.25 14.4507 22.25 12.3034 22.25H12.1966C10.0493 22.25 8.36646 22.25 7.05345 22.0735C5.70951 21.8928 4.64902 21.5157 3.81664 20.6834C2.98426 19.851 2.6072 18.7905 2.42651 17.4466C2.24998 16.1335 2.24999 14.4507 2.25 12.3034V12.1966C2.24999 10.0493 2.24998 8.36646 2.42651 7.05345C2.6072 5.70951 2.98426 4.64902 3.81664 3.81664C4.64902 2.98426 5.70951 2.6072 7.05345 2.42651C8.36646 2.24998 10.0493 2.24999 12.1966 2.25ZM7.23937 3.80941C6.05016 3.9693 5.33321 4.27339 4.8033 4.8033C4.27339 5.33321 3.9693 6.05016 3.80941 7.23937C3.64683 8.44866 3.64535 10.0377 3.64535 12.25C3.64535 14.4623 3.64683 16.0513 3.80941 17.2606C3.9693 18.4498 4.27339 19.1668 4.8033 19.6967C5.33321 20.2266 6.05016 20.5307 7.23937 20.6906C8.44866 20.8532 10.0377 20.8547 12.25 20.8547C14.4623 20.8547 16.0513 20.8532 17.2606 20.6906C18.4498 20.5307 19.1668 20.2266 19.6967 19.6967C20.2266 19.1668 20.5307 18.4498 20.6906 17.2606C20.8532 16.0513 20.8547 14.4623 20.8547 12.25C20.8547 10.0377 20.8532 8.44866 20.6906 7.23937C20.5307 6.05016 20.2266 5.33321 19.6967 4.8033C19.1668 4.27339 18.4498 3.9693 17.2606 3.80941C16.0513 3.64683 14.4623 3.64535 12.25 3.64535C10.0377 3.64535 8.44866 3.64683 7.23937 3.80941Z' fill='%238C8C8C'/%3E%3C/svg%3E");

  display: inline-flex;

  gap: var(--gap);

  &::after {
    display: none;
  }

  .ant-checkbox {
    .ant-checkbox-inner {
      width: var(--checkbox-size);
      height: var(--checkbox-size);

      background-color: transparent !important;
      background-image: var(--image);
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      border: none;

      &::after {
        display: none;
      }
    }
    &.ant-checkbox-checked .ant-checkbox-inner {
      --image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z' fill='%23F76818'/%3E%3C/svg%3E");
    }
    &.ant-checkbox-indeterminate .ant-checkbox-inner {
      --image: url('data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H15C15.4142 11.25 15.75 11.5858 15.75 12Z" fill="%23F76818"/></svg>');
    }
  }

  &:hover {
    .ant-checkbox-inner {
      opacity: var(--opacity-800);
    }
  }
  &:active {
    .ant-checkbox-inner {
      opacity: var(--opacity-1000);
    }
  }

  .ant-checkbox-label {
    padding: 0;
  }

  &.ant-checkbox-wrapper-disabled {
    .checkbox-children {
      color: var(--color-text-disabled);
    }

    .ant-checkbox {
      opacity: var(--opacity-300);
    }
  }
`

export const sizeStyles: Record<NonNullable<CheckboxProps["size"]>, SerializedStyles> = {
  s: css`
    --checkbox-size: 20px;
    --font: var(--font-body-medium-s);

    .ant-checkbox {
      .ant-checkbox-inner {
        --image: url('data:image/svg+xml,<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.1639 1.875H10.2528C12.0423 1.87499 13.4446 1.87498 14.5388 2.02209C15.6587 2.17266 16.5425 2.48688 17.2361 3.18053C17.9298 3.87418 18.244 4.75792 18.3946 5.87787C18.5417 6.97205 18.5417 8.3744 18.5417 10.1639V10.2528C18.5417 12.0423 18.5417 13.4446 18.3946 14.5388C18.244 15.6587 17.9298 16.5425 17.2361 17.2361C16.5425 17.9298 15.6587 18.244 14.5388 18.3946C13.4446 18.5417 12.0423 18.5417 10.2528 18.5417H10.1639C8.3744 18.5417 6.97205 18.5417 5.87787 18.3946C4.75792 18.244 3.87418 17.9298 3.18053 17.2361C2.48688 16.5425 2.17266 15.6587 2.02209 14.5388C1.87498 13.4446 1.87499 12.0423 1.875 10.2528V10.1639C1.87499 8.3744 1.87498 6.97205 2.02209 5.87787C2.17266 4.75792 2.48688 3.87418 3.18053 3.18053C3.87418 2.48688 4.75792 2.17266 5.87787 2.02209C6.97205 1.87498 8.3744 1.87499 10.1639 1.875ZM6.03281 3.17451C5.0418 3.30775 4.44434 3.56116 4.00275 4.00275C3.56116 4.44434 3.30775 5.0418 3.17451 6.03281C3.03903 7.04055 3.03779 8.36475 3.03779 10.2083C3.03779 12.0519 3.03903 13.3761 3.17451 14.3839C3.30775 15.3749 3.56116 15.9723 4.00275 16.4139C4.44434 16.8555 5.0418 17.1089 6.03281 17.2422C7.04055 17.3776 8.36475 17.3789 10.2083 17.3789C12.0519 17.3789 13.3761 17.3776 14.3839 17.2422C15.3749 17.1089 15.9723 16.8555 16.4139 16.4139C16.8555 15.9723 17.1089 15.3749 17.2422 14.3839C17.3776 13.3761 17.3789 12.0519 17.3789 10.2083C17.3789 8.36475 17.3776 7.04055 17.2422 6.03281C17.1089 5.0418 16.8555 4.44434 16.4139 4.00275C15.9723 3.56116 15.3749 3.30775 14.3839 3.17451C13.3761 3.03903 12.0519 3.03779 10.2083 3.03779C8.36475 3.03779 7.04055 3.03903 6.03281 3.17451Z" fill="%238C8C8C"/></svg>');
      }
      &.ant-checkbox-checked .ant-checkbox-inner {
        --image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 18.3333C6.07163 18.3333 4.10745 18.3333 2.88706 17.1129C1.66667 15.8925 1.66667 13.9283 1.66667 9.99996C1.66667 6.07159 1.66667 4.1074 2.88706 2.88701C4.10745 1.66663 6.07163 1.66663 10 1.66663C13.9284 1.66663 15.8926 1.66663 17.113 2.88701C18.3333 4.1074 18.3333 6.07159 18.3333 9.99996C18.3333 13.9283 18.3333 15.8925 17.113 17.1129C15.8926 18.3333 13.9284 18.3333 10 18.3333ZM13.3586 7.47468C13.6027 7.71876 13.6027 8.11449 13.3586 8.35857L9.19195 12.5252C8.94787 12.7693 8.55214 12.7693 8.30806 12.5252L6.6414 10.8586C6.39732 10.6145 6.39732 10.2188 6.6414 9.97468C6.88547 9.73061 7.2812 9.73061 7.52528 9.97468L8.75001 11.1994L12.4747 7.47468C12.7188 7.23061 13.1145 7.23061 13.3586 7.47468Z" fill="%23F76818"/></svg>');
      }
      &.ant-checkbox-indeterminate .ant-checkbox-inner {
        --image: url('data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H15C15.4142 11.25 15.75 11.5858 15.75 12Z" fill="%23F76818"/></svg>');
      }
    }
  `,
  m: css``,
}
