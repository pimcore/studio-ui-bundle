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
    iconGrid: css`
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: ${token.marginXS}px;
      max-height: 400px;
      overflow-y: auto;
      padding: ${token.paddingXS}px;
      border: 1px solid ${token.colorBorder};
      border-radius: ${token.borderRadius}px;
      background-color: ${token.colorFillAlter};
    `,

    iconCard: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: ${token.paddingXS}px;
      border: 1px solid ${token.colorBorder};
      border-radius: ${token.borderRadius}px;
      background-color: ${token.colorBgContainer};
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      min-height: 80px;
      
      &:hover {
        border-color: ${token.colorPrimary};
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        transform: translateY(-1px);
      }
    `,

    selectedCard: css`
      border-color: ${token.colorPrimary};
      background-color: ${token.colorPrimaryBg};
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    `,

    iconName: css`
      font-size: ${token.fontSizeSM}px;
      color: ${token.colorTextSecondary};
      text-align: center;
      margin-top: ${token.marginXXS}px;
      word-break: break-word;
      line-height: 1.2;
    `,

    selectionPreview: css`
      min-height: 32px;
      padding: ${token.paddingXXS}px ${token.paddingXS}px;
      border: 1px solid ${token.colorBorder};
      border-radius: ${token.borderRadius}px;
      background-color: ${token.colorBgContainer};
      width: 54px;
    `,

    noSelection: css`
      color: ${token.colorTextSecondary};
      font-style: italic;
    `
  }
})
