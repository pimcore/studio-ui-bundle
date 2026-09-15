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
    trigger: css`
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      padding-inline: ${token.paddingXS}px;

      /* Match the search button on the other end of the input (see search-input.styles). */
      &:not(:hover):not(:active) {
        border-color: ${token.colorBorder};
      }
    `,

    activeTriggerLabel: css`
      color: ${token.colorPrimary};
    `,

    menuHint: css`
      display: block;
      font-size: ${token.fontSizeSM}px;
    `
  }
})
