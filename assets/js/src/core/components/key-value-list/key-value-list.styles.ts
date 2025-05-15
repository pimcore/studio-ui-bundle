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

export const useStyles = createStyles(({ token, css }) => {
  return {
    keyValueList: css`
      border: 0;
      border-collapse: collapse;

      tr td {
        padding: ${token.Table.cellPaddingBlockSM}px;
        border: 0;
        border-bottom: 1px solid ${token.colorBorderSecondary};
        
        &:first-child {
          min-width: 100px;
        }
      }

      tr:last-of-type td {
        border-bottom: 0;
      }
    `
  }
})
