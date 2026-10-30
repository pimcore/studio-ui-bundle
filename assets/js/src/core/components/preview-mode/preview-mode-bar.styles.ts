/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createStyles } from '@Pimcore/modules/ant-design/styles/create-styles'

export const useStyles = createStyles(({ token, css }) => {
  return {
    description: css`
      color: ${token.colorTextDescription};
    `,

    bar: css`
      flex: 1;
      min-width: 0;
    `,

    divider: css`
      /* reaches across the padding of the stack list's body */
      margin: 0 -${token.paddingXS}px;
      width: auto;
      min-width: 0;
      border-color: ${token.colorBorderSecondary};
    `,

    row: css`
      padding: ${token.paddingXS}px ${token.paddingXXS}px 0;
    `,

    label: css`
      color: ${token.colorTextDescription};
      flex-shrink: 0;
      min-width: 56px;
    `,

    value: css`
      flex: 1;
      min-width: 0;

      /* the grid renders its cells with a table frame (some of it !important, per row and pseudo element);
         outside the grid the value shows plain, so this out-ranks those rules */
      &&&&&&&& .ant-table-wrapper,
      &&&&&&&& .ant-table,
      &&&&&&&& .ant-table-container,
      &&&&&&&& .ant-table-content,
      &&&&&&&& .ant-table-content table,
      &&&&&&&& .ant-table-row,
      &&&&&&&& .ant-table-cell,
      &&&&&&&& .ant-table-cell::before,
      &&&&&&&& .ant-table-cell::after {
        border: 0 !important;
        border-radius: 0 !important;
        background: transparent !important;
        box-shadow: none !important;
      }

      &&&&&&&& .ant-table-cell {
        padding-inline: 0 !important;
      }
    `
  }
})
