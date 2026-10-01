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
    form: css`
      /* Tightens the theme-wide Form.itemMarginBottom for this modal only. */
      .ant-form-item:not(:last-child) {
        margin-bottom: ${token.marginXS}px;
      }
    `
  }
})
