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
    grid: css`
      display: flex; 
      width: 100%;
      max-width: 100%;

      table {
        table-layout: fixed;
        width: auto;
        height: 0;
      }

      th {
        user-select: none;
      }

      th, td {
        line-height: 1.83;
        padding: ${token.Table.cellPaddingBlockSM}px ${token.Table.cellPaddingInlineSM}px;
      }

      &.ant-table-wrapper .ant-table.ant-table-small .ant-table-tbody>tr>td {
        padding: 0;
      }

      .ant-table-cell {
        position: relative;
        border-left: 1px solid ${token.Table.colorBorderSecondary};
        white-space: nowrap;
        text-overflow: ellipsis;

        &.ant-table-cell__no-data {
          padding: ${token.paddingXS}px 0px ${token.paddingXS}px ${token.paddingXS}px !important;
        }

        &:last-of-type {
          border-right: 1px solid #F0F0F0;
        }
      }

      .ant-table-thead {
        position: sticky;
        top: 0;
        z-index: 1;

        .grid__cell-content {
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: center;
        }

        .grid__sorter {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          width: 26px;
        }
      }

      .ant-table-row {
        height: 41px;
      }

      .ant-table-content {
        table {
          border: 1px solid #F0F0F0;
          border-radius: 8px;
        }
          
          .ant-table-tbody {
            .ant-table-row:last-of-type {
              .ant-table-cell:first-of-type {
                border-bottom-left-radius: 8px;
              }
              .ant-table-cell:last-of-type {
                border-bottom-right-radius: 8px;
              }
            }
          }
      }
      
      &.versionFieldItem {
        .ant-table-content {
          table {
            width: 100% !important;
          }
        }
      }

      &.versionFieldItemHighlight {
        .ant-table-content {
          table {
            border-color: ${token.Colors.Brand.Warning.colorWarningBorder} !important;
          }
        }
      }

      .grid__cell-content {
        display: flex;
        width: 100%;
        height: 100%;
          
        .ant-skeleton {
          width: 100%;
          margin: 4px;
            
            .ant-skeleton-input {
              min-width: unset;
              width: 100%;
            }
        }
      }

      .grid__cell-content > * {
        display: flex;
        width: 100%;
        height: 100%;
      }

      .ant-table-row-selected td {
        background-color: ${token.controlItemBgActive};
      }
    `,

    disabledGrid: css`
      .ant-table-cell {
        background-color: ${token.colorBgContainerDisabled};
        color: ${token.colorTextDisabled};
      }
    `
  }
}, { hashPriority: 'low' })
