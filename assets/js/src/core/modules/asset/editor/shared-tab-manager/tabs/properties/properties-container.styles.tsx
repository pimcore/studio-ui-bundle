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
      display: flex;
      flex-direction: column;
    `,
    toolbar: css`
      display: flex;
      gap: 12px;
      align-items: center;

      .pimcore-properties-toolbar__predefined-properties {
        display: flex;
        align-items: center;
        gap: 8px;
          
        .pimcore-properties-toolbar__predefined-properties__manual {
          display: flex;
          gap: 8px;
          
          .ant-select {
            min-width: 100px;
          }
        }
        
        .ant-select {
          .ant-select-selection-placeholder,
          .ant-select-arrow {
            color: rgba(0, 0, 0, 0.88)   
          }
        }

      }
    `,
    content: css`
        padding: ${token.paddingXS}px;
    `
  }
})
