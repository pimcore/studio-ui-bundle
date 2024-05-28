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
          //value (data) column
          .ant-table-cell:nth-child(4) {
            .grid__cell-content {
              width: 100%;
              display: flex;
              align-items: center;
            }
              
            p {
              margin: 0;
              flex-grow: 1;
            }
              
            .ant-btn {
              color: ${token.colorIcon};
              
              &:hover {
                color: ${token.colorPrimaryHover}
              }
            }
          }
            
          //inherited properties
          .ant-table-cell:nth-child(5) {
            .grid__cell-content {
              width: 100%;
              display: flex;
              justify-content: center;
            }
          }
        }
      }
        
      .headline {
        padding: ${token.paddingXS}px;
        margin: 0;
      }
    `
  }
})
