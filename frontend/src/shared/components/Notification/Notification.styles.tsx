import { css } from "@emotion/css"
import styled from "@emotion/styled"

import { Alert as BaseAlert } from "@/shared/components/Alert"

export const Alert = styled(BaseAlert)`
  padding: var(--gap-xs);

  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: none;

  .ant-alert-icon {
    --icon-size: 24px;

    display: flex;

    align-items: center;
    justify-content: center;

    width: var(--icon-size);
    height: var(--icon-size);

    font-size: 17px;
    color: var(--icon-color);

    background-color: var(--icon-background-color);
    border-radius: var(--radius-circle);
  }

  .ant-alert-content {
    .ant-alert-message {
      margin-bottom: var(--gap-5xs);

      font: var(--font-subheading-xl);
      color: var(--color-text-primary);
    }

    .ant-alert-description {
      font: var(--font-body-regular-s);
      color: var(--color-text-primary);
    }
  }

  .ant-alert-close svg {
    font-size: 14px;
    color: var(--color-icon-tertiary);
  }

  &.ant-alert-info {
    --border-color: var(--color-border-info);
    --background-color: var(--color-surface-elements-sub-info);
    --icon-color: var(--color-icon-info);
    --icon-background-color: var(--color-blue-200);
  }

  &.ant-alert-warning {
    --border-color: var(--color-border-warning);
    --background-color: var(--color-surface-elements-sub-warning);
    --icon-color: var(--color-icon-warning);
    --icon-background-color: var(--color-yellow-200);
  }

  &.ant-alert-error {
    --border-color: var(--color-border-critical);
    --background-color: var(--color-surface-elements-sub-critical);
    --icon-color: var(--color-icon-error);
    --icon-background-color: var(--color-red-200);
  }

  &.ant-alert-success {
    --border-color: var(--color-border-success);
    --background-color: var(--color-surface-elements-sub-success);
    --icon-color: var(--color-icon-success);
    --icon-background-color: var(--color-green-200);
  }
`
export const StyledNotification = css`
  &.ant-notification-notice {
    --border-color: var(--color-border-info);
    --background-color: var(--color-surface-elements-sub-info);
    --icon-color: var(--color-icon-info);
    --icon-background-color: var(--color-blue-200);
    --icon-size: 24px;

    padding: var(--gap-xs) !important;

    background-color: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    box-shadow: none;

    .ant-notification-notice-icon {
      display: flex;

      align-items: center;
      justify-content: center;

      width: var(--icon-size);
      height: var(--icon-size);

      font-size: 17px;
      color: var(--icon-color);

      background-color: var(--icon-background-color);
      border-radius: var(--radius-circle);
    }

    .ant-notification-notice-content {
      .ant-notification-notice-message {
        margin-inline-start: calc(var(--icon-size) + var(--gap-3xs));
        margin-bottom: var(--gap-5xs);

        font: var(--font-subheading-xl);
        color: var(--color-text-primary);
      }

      .ant-notification-notice-description {
        font: var(--font-body-regular-s);
        color: var(--color-text-primary);
      }
    }

    .ant-notification-notice-close svg {
      font-size: 14px;
      color: var(--color-icon-tertiary);
    }

    &.ant-notification-notice-warning {
      --border-color: var(--color-border-warning);
      --background-color: var(--color-surface-elements-sub-warning);
      --icon-color: var(--color-icon-warning);
      --icon-background-color: var(--color-yellow-200);
    }

    &.ant-notification-notice-error {
      --border-color: var(--color-border-critical);
      --background-color: var(--color-surface-elements-sub-critical);
      --icon-color: var(--color-icon-error);
      --icon-background-color: var(--color-red-200);
    }

    &.ant-notification-notice-success {
      --border-color: var(--color-border-success);
      --background-color: var(--color-surface-elements-sub-success);
      --icon-color: var(--color-icon-success);
      --icon-background-color: var(--color-green-200);
    }

    svg {
      width: 1em;
      height: 1em;

      fill: currentColor;
    }
  }
`
