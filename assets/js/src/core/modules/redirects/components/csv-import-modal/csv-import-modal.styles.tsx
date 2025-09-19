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

export const useStyle = createStyles(({ token, css }) => {
  return {
    csvTargetContainer: css`
      border-radius: ${token.borderRadiusLG}px;
      outline: 2px dashed ${token.colorBorder};
      background: ${token.controlItemBgHover};
      padding: ${token.paddingLG}px;
      max-width: 100%;
      min-height: 100px;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      
      &:hover {
        outline-color: ${token.colorPrimary};
        background: ${token.controlItemBgActive};
      }
      
      &.dnd--drag-active {
        outline-color: ${token.colorPrimary};
        background: ${token.controlItemBgActive};
      }
      
      &.dnd--drag-valid {
        outline-color: ${token.colorSuccess};
        background: ${token.colorSuccessBg};
      }
      
      &.dnd--drag-error {
        outline-color: ${token.colorError};
        background: ${token.colorErrorBg};
      }
      
      .csv-target-title {
        text-align: center;
        color: ${token.colorTextSecondary};
      }
      
      .icon-container {
        color: ${token.colorIcon};
      }
    `,
    uploadedFile: css`
      
        .file-name {
          font-weight: ${token.fontWeightStrong};
        }
        
        .file-size {
          color: ${token.colorTextSecondary};
          font-size: ${token.fontSizeSM}px;
        }

        .icon-button--theme-primary {
          margin-top: 3px;
        }
    `
  }
})
