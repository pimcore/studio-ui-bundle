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
    // First, previous, next and last, with the total in front of them.
    controls: css`
      .pagination-control {
        padding: 0;
        height: 24px;
      }

      /* Antd's list gave its previous and next buttons the text colour; outside it, an icon
         button would take the link colour. Same weight as antd's rule, so hover still wins. */
      button.pagination-control {
        color: ${token.colorText};
      }

      .pagination-control:disabled {
        opacity: 0.5;
      }
    `,

    // Antd's own total text is styled only inside its list; this matches it next to the controls.
    totalText: css`
      margin-inline-end: ${token.marginXS}px;
      line-height: ${token.controlHeightSM}px;
      white-space: nowrap;
    `
  }
})
