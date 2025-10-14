import { css } from "@emotion/css"

import { NotificationArgsProps } from "./Notification.types"

export const StyledNotificationFn = (type: NotificationArgsProps["type"] = "info") => css`
  &.ant-notification-notice {
    && {
      --icon-size: 24px;
      --border-color: var(--color-border-${type}-soft);
      --background-color: var(--color-surface-elements-sub-${type});
      --icon-color: var(--color-icon-${type}-alt);
      --icon-background-color: var(--color-surface-elements-sub-${type}-hover);

      padding: var(--gap-xs);

      background-color: var(--background-color);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);

      .ant-notification-notice-close {
        top: var(--gap-xs);
        right: var(--gap-xs);

        width: 14px;
        height: 24px;

        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: var(--radius-xs);
        background: none;

        font-size: 14px;

        color: var(--color-text-secondary);

        &:hover {
          color: var(--color-text-accent-hover);
        }

        &:active {
          color: var(--color-text-accent);
        }
      }

      .ant-notification-notice-content {
        display: grid;
        gap: var(--gap-5xs);

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

        .ant-notification-notice-message {
          margin-inline-start: calc(var(--icon-size) + var(--gap-3xs));
          margin-bottom: var(--gap-5xs);

          font: var(--font-subheading-xl);
          color: var(--color-text-primary);
        }

        .ant-notification-notice-description {
          margin-inline-start: calc(var(--icon-size) + var(--gap-3xs));
          margin-top: 0;

          font: var(--font-body-regular-s);
          color: var(--color-text-primary);
        }
      }

      svg {
        width: 1em;
        height: 1em;

        * {
          fill: currentColor;
        }
      }
    }
  }
`
