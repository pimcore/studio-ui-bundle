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
    warning: css`
      display: flex;
      align-items: center;
      gap: ${token.marginXXS}px;
      margin-top: ${token.marginXXS}px;
      /* colorWarningText is too light here; colorWarningTextActive is the design's warn shade. */
      color: ${token.colorWarningTextActive};

      .ant-typography {
        color: inherit;
      }

      /* question-mark-outline hardcodes fill="black". */
      .pimcore-icon svg path {
        fill: currentColor;
      }
    `
  }
})
