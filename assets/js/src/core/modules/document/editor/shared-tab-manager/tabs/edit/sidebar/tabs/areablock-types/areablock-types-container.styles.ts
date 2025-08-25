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
    container: css`
      padding: ${token.paddingSM}px;
    `,

    collapsibleContainer: css`
      width: 100%;
    `,

    gridContainer: css`
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: ${token.marginXS}px;
      margin-bottom: ${token.marginXS}px;
      width: 100%;
      align-items: stretch;
    `
  }
})
