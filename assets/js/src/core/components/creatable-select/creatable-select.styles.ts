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
    // Set apart from the options by a hairline, as other select footers in Studio; the row spans
    // the options' width, so the input lines up with them.
    footer: css`
      margin-top: ${token.marginXXS}px;
      padding: ${token.paddingXS}px 0 ${token.paddingXXS}px;
      border-top: 1px solid ${token.colorBorderSecondary};
    `
  }
})
