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
    content: css`
      .ant-empty-image {
        margin-bottom: ${token.marginXS}px;
        height: auto;
      }
        
      .ant-empty-description {
        padding: 5px ${token.controlPaddingHorizontal}px;
        font-size: 14px;
        color: ${token.Empty.colorTextDisabled};
        line-height: 20px;
      }
    `
  }
})
