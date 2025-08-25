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

export const useStyles = createStyles(({ token, css }) => {
  return {
    container: css`
      padding: ${token.paddingSM}px;
    `,

    emptyStateContainer: css`
      padding: ${token.paddingSM}px;
      text-align: center;
    `,

    groupTitle: css`
      display: block;
      margin-bottom: ${token.marginMD}px;
      font-weight: ${token.fontWeightStrong};
      text-transform: uppercase;
      color: ${token.colorTextSecondary};
    `,

    groupDivider: css`
      margin: ${token.marginLG}px 0 ${token.marginMD}px 0;
    `,

    gridContainer: css`
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: ${token.marginXS}px;
      margin-bottom: ${token.marginXS}px;
      width: 100%;
      align-items: stretch;
    `,

    areablockName: css`
      font-size: 9px;
      color: ${token.colorTextTertiary};
      margin-top: 2px;
      word-break: break-word;
      hyphens: auto;
      white-space: normal;
      overflow-wrap: break-word;
    `
  }
})
