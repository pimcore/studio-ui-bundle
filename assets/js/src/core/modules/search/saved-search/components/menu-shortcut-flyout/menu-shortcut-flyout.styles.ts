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

export const useStyles = createStyles(({ css, token }) => {
  return {
    flyout: css`
      min-width: 220px;
      max-width: 320px;
      max-height: 60vh;
      overflow-y: auto;
    `,

    groupLabel: css`
      display: block;
      padding: ${token.paddingXXS}px ${token.paddingXS}px;
      color: ${token.colorTextLabel};
    `,

    row: css`
      display: flex;
      align-items: center;
      gap: ${token.marginXXS}px;

      .saved-search-shortcut-open {
        flex: 1 1 auto;
        justify-content: flex-start;
        overflow: hidden;
      }
    `
  }
})
