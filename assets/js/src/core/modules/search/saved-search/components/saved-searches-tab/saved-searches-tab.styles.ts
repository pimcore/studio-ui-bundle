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
    // Align the footer toolbar's top border with the grid's borders (the Toolbar default uses the
    // fainter colorBorderTertiary). !important is needed to win over the Toolbar's own
    // `border-top: 1px solid <tertiary>` shorthand (same specificity, later in source order).
    footer: css`
      .toolbar {
        border-top: 1px solid ${token.Table.colorBorderSecondary} !important;
      }
    `
  }
})
