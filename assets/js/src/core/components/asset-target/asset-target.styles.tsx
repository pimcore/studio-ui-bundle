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

export const useStyle = createStyles(({ token, css }) => {
  return {
    assetTargetContainer: css`
      border-radius: ${token.borderRadiusLG}px;
      outline: 1px dashed ${token.colorBorder};
      background: ${token.controlItemBgHover};
      padding: ${token.paddingSM}px;
      max-width: 100%;
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
