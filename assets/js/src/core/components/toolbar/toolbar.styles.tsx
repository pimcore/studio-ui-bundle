/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ token, css }) => {
  return {
    toolbar: css`
      width: 100%;
      height: 48px;
      padding: ${token.paddingXS}px;

      &.toolbar--theme-primary {
        // @todo: use token
        background-color: #F5F3FA;
      }

      &.toolbar--theme-secondary {
        background-color: ${token.colorBgBase};
      }

      &.toolbar--position-top {
        border-bottom: 1px solid ${token.colorBorderTertiary};
      }

      &.toolbar--position-bottom {
        border-top: 1px solid ${token.colorBorderTertiary}
      }

      &.toolbar--border-default {
        border-color: ${token.colorBorderTertiary};
      }

      &.toolbar--border-primary {
        border-color: ${token.colorPrimaryBorder};
      }

      &.toolbar--size-small {
        height: 40px;
      }

      &.toolbar--size-auto {
        height: 100%;
      }
    `
  }
})
