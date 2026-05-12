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

export const useStyle = createStyles(({ token, css }) => {
  return {
    mergerContainer: css`
      .row-conflict td.ant-table-cell {
        background-color: ${token.Colors.Brand.Warning.colorWarningBg} !important;
      }

      .ant-table-content table {
        border: 1px solid ${token.Table.colorBorderSecondary};
        border-radius: ${token.borderRadiusLG}px;
      }

      .ant-table-thead .ant-table-cell {
        border-top: 1px solid ${token.Table.colorBorderSecondary};
      }

      .ant-table-cell {
        border-left: 1px solid ${token.Table.colorBorderSecondary};
      }

      .ant-table-cell:first-of-type {
        border-left: none;
      }

      .ant-table-tbody > tr:last-child > td:first-child {
        border-bottom-left-radius: ${token.borderRadiusLG}px;
      }

      .ant-table-tbody > tr:last-child > td:last-child {
        border-bottom-right-radius: ${token.borderRadiusLG}px;
      }
    `
  }
})
