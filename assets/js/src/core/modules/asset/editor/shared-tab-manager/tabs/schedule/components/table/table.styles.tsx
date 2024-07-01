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

export const useStyles = createStyles(({ css, token }) => {
  return {
    table: css`
      .ant-table-content {
        div[data-grid-column="schedule-table--active-column"] {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        div[data-grid-column="schedule-table--action-column"],
        div[data-grid-column="schedule-table--version-column"]{
          padding: 6px;
          flex-grow: 1;
          
          .pseudo-select {
            display: flex;
            align-items: center;
            gap: ${token.marginXS}px;
            color: ${token.colorPrimary};

            .pseudo-select__content {
              > p {
                margin: 0;
              }
            }
          }
            
          .ant-dropdown-trigger {
            padding: 0;
            display: flex;
            align-items: center;
            color: ${token.colorPrimary};
              
            &:hover {
              color: ${token.colorPrimaryHover};
            }
          }
        }

        .schedule-table--actions-column {
          display: flex;
          align-items: center;
  
          .ant-btn-icon {
            color: ${token.colorPrimary};
  
              &:hover {
                color: ${token.colorPrimaryHover};
              }
          }
        }
      }
    `
  }
})
