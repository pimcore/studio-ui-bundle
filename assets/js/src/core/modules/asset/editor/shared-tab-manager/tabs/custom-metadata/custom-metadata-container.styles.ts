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
      gap: 10px;
      padding: ${token.paddingXS}px;
      align-items: center;

      .ant-btn {
          display: flex;
          align-items: center;
      }
        
      .ant-select {
        .ant-select-selector {
          border: 1px solid ${token.Button.defaultBorderColor};
          
          .ant-select-selection-placeholder {
            color: ${token.Button.defaultColor} !important;
          }
        }
          
        .ant-select-arrow {
          color: ${token.Button.defaultColor} !important;
        }
      }

      .pimcore-custom-metadata-toolbar__headline {
          font-weight: 600;
          line-height: 20px;
          color: ${token.itemActiveColor};
      }
        
        .pimcore-custom-metadata-toolbar__manual {
            display: flex;
            gap: 10px;

            .pimcore-custom-metadata-toolbar__manual__editmode {
                display: flex;
                gap: 10px;
            }
        }
    `,
    content: css`
        padding: ${token.paddingXS}px;
    `
  }
})
