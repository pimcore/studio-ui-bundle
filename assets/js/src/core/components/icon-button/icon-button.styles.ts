/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
