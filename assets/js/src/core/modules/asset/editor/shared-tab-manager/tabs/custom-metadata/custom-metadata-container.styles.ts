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
    tab: css`
        
    `,
    toolbar: css`
      // @todo: remove after replacement with centralized select component
      .ant-select {
        .ant-select-selector {
          min-width: 100px;
          border: 1px solid ${token.Button.defaultBorderColor};
          
          .ant-select-selection-placeholder {
            color: ${token.Button.defaultColor} !important;
          }
        }
          
        .ant-select-arrow {
          color: ${token.Button.defaultColor} !important;
        }
      }
    `
  }
})
