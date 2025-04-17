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
        top: 50%;
        left: 0;
        right: 0;
        margin: auto;
        color: inherit;
        transform: translateY(-50%);
      }
      
      .button__text {
        transition: opacity 200ms ease-in-out;
        
        &:empty {
          display: none;
        }
      }
      
      .button__loading-spinner + .button__text {
        opacity: 0;
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

      &.button--color-secondary {
        border-color: ${token.colorBorderSecondary};
        box-shadow: none;
        color: ${token.colorText};
      }
      &.button--color-secondary:hover {
        border-color: ${token.colorBorderSecondary} !important;
        color: ${token.colorText} !important;
      }
    `
  }
})
