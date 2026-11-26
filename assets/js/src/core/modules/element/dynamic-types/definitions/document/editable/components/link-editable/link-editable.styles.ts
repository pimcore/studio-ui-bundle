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
    documentLink: css`
      display: inline-flex !important;
      align-items: center;
      gap: ${token.marginXXS}px;
      max-width: 100%;
      vertical-align: middle;
    `,
    documentLinkPreview: css`
      min-width: 0;
      overflow-wrap: anywhere;
    `,
    documentLinkActionsBase: css`
      display: flex;
      flex-shrink: 0;
      gap: 2px;
    `
  }
})
