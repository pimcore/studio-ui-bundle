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
    table: css`
      width: auto !important;
      min-width: 100%;
      border-radius: 0 !important;

      td, th {
        padding: 2px ${token.paddingXXS}px !important;
        text-align: left;
        border: 1px solid ${token.colorBorderSecondary};
        white-space: nowrap;
        width: auto;
      }
      
    `,
    tableNoMinWidth: css`
      min-width: auto;
    `
  }
})
