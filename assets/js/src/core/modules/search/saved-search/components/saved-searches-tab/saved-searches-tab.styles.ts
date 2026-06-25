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
    // fainter colorBorderTertiary, which doesn't match the grid rows in the design).
    footer: css`
      .toolbar {
        border-top-color: ${token.Table.colorBorderSecondary};
      }
    `
  }
})
