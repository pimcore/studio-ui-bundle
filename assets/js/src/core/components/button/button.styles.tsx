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
      position: relative;

      .button__loading-spinner,
      .ant-spin-dot {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        color: inherit;
      }

      &.button--type-action {
        background-color: ${token.colorBgToolbar};
        border: none;
        box-shadow: none;
        border-radius: ${token.borderRadius}px ${token.borderRadius}px 0 0;

        &.ant-btn-variant-outlined:not(:disabled):not(.ant-btn-disabled):hover {
          background-color: ${token.colorFillActive};
        }
      }
    `
  }
})
