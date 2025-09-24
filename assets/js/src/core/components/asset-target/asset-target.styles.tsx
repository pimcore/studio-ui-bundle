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
    assetTargetContainer: css`
      border-radius: ${token.borderRadiusLG}px;
      outline: 1px dashed ${token.colorBorder};
      background: ${token.controlItemBgHover};
      padding: ${token.paddingSM}px;
      max-width: 100%;
      min-width: 150px;
      min-height: 100px;
      position: relative;
      
      .image-target-title {
          text-align: center;
      }
      
      .icon-container {
        color: ${token.colorIcon};
      }
    `,
    closeButton: css`
      position: absolute;
      top: ${token.paddingXXS}px;
      right: ${token.paddingXXS}px;
    `
  }
})
