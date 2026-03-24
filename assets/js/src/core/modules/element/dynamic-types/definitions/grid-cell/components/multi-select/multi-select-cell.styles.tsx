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
    'multi-select-cell': css`
      .ant-select, .studio-select {
        width: 100%;
      }
    `,

    'multi-select-cell--read': css`
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: ${token.paddingXXS}px;
    `
  }
})
