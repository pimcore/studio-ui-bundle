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
      /* colorWarningText resolves to the base warning tone in this theme — the design asks for
         the darker warn shade, which colorWarningTextActive (gold-7) provides. */
      color: ${token.colorWarningTextActive};

      .ant-typography {
        color: inherit;
      }

      /* question-mark-outline hardcodes fill="black"; tie it to the row color. */
      .pimcore-icon svg path {
        fill: currentColor;
      }
    `,

    warningAttempted: css`
      color: ${token.colorError};
    `
  }
})
