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
          div[data-grid-column="properties-table--data-column"] {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 4px;
            padding: ${token.paddingXS}px ${token.paddingXXS}px ${token.paddingXS}px ${token.paddingXXS}px;

            > :first-child {
              margin: 0;
              padding: 0;
              flex-grow: 1;
              
              > * {
                flex-grow: 1;
                width: 100%;
              }
            }

            .pimcore-icon {
              color: ${token.colorIcon};
            }
          }

          .properties-table--inheritable-column {
              width: 100%;
              display: flex;
              justify-content: center;
            }
          }

          .properties-table--actions-column {
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
    `
  }
})
