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
    body: css`
      display: flex;
      flex-direction: column;
      gap: ${token.paddingSM}px;
      max-height: 70vh;
      overflow-y: auto;
      position: relative;
    `,

    headerContainer: css`
      position: sticky;
      top: 0;
      width: 100%;
      z-index: 10;
      background-color: ${token.colorBgContainer};
      display: flex;
      gap: ${token.paddingXS}px;
    `,

    headerItem: css`
      flex: 1 1 50%;
      min-width: 50%;
      padding: ${token.paddingXXS}px ${token.paddingXS}px;
      background-color: ${token.colorFillAlter};
      border: 1px solid ${token.colorBorderSecondary};
      border-radius: ${token.borderRadius}px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    `,

    columns: css`
      display: flex;
      gap: ${token.paddingSM}px;
      align-items: stretch;
    `,

    column: css`
      flex: 1 1 50%;
      min-width: 50%;
      padding: ${token.paddingXS}px;
      border: 1px solid ${token.colorBorderSecondary};
      border-radius: ${token.borderRadius}px;
    `,

    emptyState: css`
      padding: ${token.paddingLG}px;
      text-align: center;
      color: ${token.colorTextSecondary};
    `
  }
})
