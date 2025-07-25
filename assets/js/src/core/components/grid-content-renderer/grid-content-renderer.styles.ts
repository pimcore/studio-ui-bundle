/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ token, css }) => ({
  gridContentRenderer: css`
    &.grid-content-renderer {
      .ant-table-content table {
        min-width: auto !important;
        width: 100% !important;
      }

      .ant-table {
        margin-block: 0 !important;
        margin-inline: 0 !important;
        margin: 2px -4px !important;
      }

      .ant-table-thead {
        display: none;
      }

      .ant-table-row {
        display: flex;
        flex-wrap: wrap;
        height: auto;
      }

      .ant-table-cell {
        width: auto !important;
        min-width: 0 !important;
        max-width: 100% !important; 
        padding: 2px 8px !important;
        border: none;

        &::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          height: 16px;
          width: 2px;
          background-color: ${token.Table.colorBorderSecondary};
        }

        &:last-child {
          &::after {
            content: none;
          }
        }
      }

      .default-cell__content {
        padding: 0;
        margin: 0;
      }

      .grid-cell-preview-wrapper {
        padding: 2px 4px;
      }
    }
  `
}))
