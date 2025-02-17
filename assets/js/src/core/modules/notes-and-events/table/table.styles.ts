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
    table: css`
      .ant-table {
        .ant-table-tbody {
          
          .properties-table--actions-column {
            align-items: center;
            
            .ant-btn-icon {
              color: ${token.colorPrimary};
                
              &:hover {
                color: ${token.colorPrimaryHover};
              }
            }
          }
        }
      }
        
      .headline {
        padding: ${token.paddingXS}px;
        margin: 0;
      }
    `,
    link: css`
      gap: 8px;
      width: 100%;
      
      .ant-tag {
      margin-left: 5px;
        height: fit-content;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
        cursor: pointer;
      }`
  }
})
