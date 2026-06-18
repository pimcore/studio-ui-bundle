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
    headline: css`
      width: 100%;
      height: auto;
      /* paddingXXS (4px) outer + 2px inner buffer = 6px, giving 44px with standard 32px content */
      padding-top: 6px;
      padding-bottom: 6px;
      padding-left: ${token.paddingSM}px;
      padding-right: ${token.paddingXS}px;
      display: flex;
      align-items: center;
      background-color: ${token.colorBgBase};

      > * {
        flex: 1;
        min-width: 0;
      }

      &.headline--position-top {
        border-bottom: 1px solid ${token.colorBorderTertiary};
      }

      &.headline--position-bottom {
        border-top: 1px solid ${token.colorBorderTertiary};
      }

      &.headline--position-content {
        border-top: 1px solid ${token.colorBorderTertiary};
        border-bottom: 1px solid ${token.colorBorderTertiary};
      }

      &.headline--border-default {
        border-color: ${token.colorBorderTertiary};
      }

      &.headline--border-primary {
        border-color: ${token.colorPrimaryBorder};
      }
    `
  }
})
