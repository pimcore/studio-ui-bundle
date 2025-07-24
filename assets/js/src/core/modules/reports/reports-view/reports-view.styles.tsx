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

export const useStyles = createStyles(({ css, token }) => {
  return {
    selectReportLabel: css`
      color: ${token.itemActiveColor};
      font-weight: ${token.fontWeightStrong};
    `,

    selectReportGroupLabel: css`
      color: ${token.colorTextDescription};
      font-size: ${token.fontSize}px;
      text-transform: uppercase;
    `,

    withDivider: css`
      &:before {
        content: '';
        display: block;
        margin-bottom: 10px;
        width: 100%;
        height: 1px;
        background-color: ${token.colorSplit};
      }
    `,

    drillDownSelectLabel: css`
      color: ${token.colorPrimary};
    `,

    dropdownLabel: css`
      color: ${token.colorPrimary};
    `
  }
})
