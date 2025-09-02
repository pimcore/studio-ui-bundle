/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ css, token }) => {
  return {
    documentLink: css`
      position: relative;
      display: inline-flex !important;
      align-items: flex-start;
    `,
    documentLinkPreview: css`
      margin-right: 30px; /* Reserve space for buttons */
    `,
    documentLinkActionsBase: css`
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      gap: 2px;
    `,
    documentLinkActions: css`
      right: -38px;
    `,
    documentLinkActionsSingle: css`
      right: -4px;
    `
  }
})
