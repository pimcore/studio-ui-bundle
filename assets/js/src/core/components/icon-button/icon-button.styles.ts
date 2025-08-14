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
    button: css`
      padding: 6px;
      height: 32px;
      width: 32px;
      line-height: 0;

      &.icon-button--theme-secondary {
        color: ${token.colorText};
      }
      
      &.icon-button--hide-shadow {
        box-shadow: none;
      }

      &.icon-button--size-small {
        padding: 4px;
        height: 24px;
        width: 24px;
      }

      &.icon-button--variant-minimal {
        padding: 0;
        width: auto;
        height: auto;
      }

      &.icon-button--variant-static {
        width: 24px;
        height: 24px;
        padding: 4px;
        border: 1px solid ${token.colorBorderContainer};
        background-color: ${token.IconButton.colorBgContainer};
        border-radius: ${token.IconButton.borderRadiusSM};

        &:hover, &:disabled, &:active {
          border-color: ${token.colorBorderContainer} !important;
        }

        &:focus-visible {
          outline: none !important;
          outline-offset: 0 !important;
        }
      }
    `
  }
})
