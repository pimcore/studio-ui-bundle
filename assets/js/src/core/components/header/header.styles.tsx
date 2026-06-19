/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createStyles } from '@Pimcore/modules/ant-design/styles/create-styles'

export const useStyles = createStyles(({ token, css }) => {
  return {
    header: css`
      display: flex;
      width: 100%;
      height: 32px;
      min-height: 32px;
      align-items: center;
      gap: 8px;

      .header__title {
          font-weight: 600;
          color: ${token.colorPrimary};
          white-space: nowrap;
      }

      .header__text {
        white-space: nowrap;
        margin: 0;

        h1 {
          margin: 0;
        }
      }

      &.header--position-top {
        border-bottom: 1px solid ${token.colorBorderTertiary};
      }

      &.header--position-bottom {
        border-top: 1px solid ${token.colorBorderTertiary};
      }

      &.header--position-content {
        border-top: 1px solid ${token.colorBorderTertiary};
        border-bottom: 1px solid ${token.colorBorderTertiary};
      }

      &.header--border-default {
        border-color: ${token.colorBorderTertiary};
      }

      &.header--border-primary {
        border-color: ${token.colorPrimaryBorder};
      }
    `,
    headlineMode: css`
      height: auto;
      min-height: unset;
      /* paddingXXS (4px) outer + 2px inner buffer = 6px, giving 44px with standard 32px content */
      padding-top: 6px;
      padding-bottom: 6px;
      padding-left: ${token.paddingSM}px;
      padding-right: ${token.paddingXS}px;
      background-color: ${token.colorBgBase};

      > * {
        flex: 1;
        min-width: 0;
      }
    `
  }
}, { hashPriority: 'low' })
