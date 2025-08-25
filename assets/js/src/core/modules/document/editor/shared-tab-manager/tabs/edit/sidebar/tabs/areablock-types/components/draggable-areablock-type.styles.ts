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
    typeButton: css`
      flex: 0 0 calc(50% - ${token.marginXS / 2}px);
      height: auto;
      padding: ${token.paddingMD}px ${token.paddingXS}px;
      border: 1px solid ${token.colorBorder};
      border-radius: ${token.borderRadiusLG}px;
      background: ${token.colorBgContainer};
      min-width: 0; /* Prevent flex items from overflowing */

      &:hover {
        border-color: ${token.colorPrimary};
      }
    `,

    buttonContent: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 60px; /* Ensure consistent button height */
    `,

    iconWrapper: css`
      font-size: 24px;
      margin-bottom: ${token.marginXXS}px;
      color: ${token.colorTextSecondary};
    `,

    typeName: css`
      font-size: 11px;
      line-height: 1.2;
      text-align: center;
      color: ${token.colorText};
      word-break: break-word;
      hyphens: auto;
      white-space: normal;
      overflow-wrap: break-word;
    `
  }
})
