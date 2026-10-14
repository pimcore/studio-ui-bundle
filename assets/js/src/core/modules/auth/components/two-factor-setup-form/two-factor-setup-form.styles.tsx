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
    secret: css`
      display: flex;
      align-self: center;
      align-items: center;
      gap: ${token.marginXS}px;
      max-width: 100%;
      padding: ${token.paddingXS}px ${token.paddingSM}px;
      border: 1px solid ${token.colorBorderSecondary};
      border-radius: ${token.borderRadius}px;
      background: ${token.colorFillQuaternary};
      font-family: ${token.fontFamilyCode};

      .ant-typography-copy {
        flex-shrink: 0;
        margin-inline-start: 0;
      }
    `,

    // Long words, such as a raw translation key before login, must not push the QR code aside
    sideDescription: css`
      flex: 1;
      min-width: 0;
      overflow-wrap: anywhere;
    `,

    divider: css`
      margin: 0;
    `,

    codeLabel: css`
      display: block;
      margin-bottom: ${token.marginXS}px;
      text-align: center;
    `,

    // At most seven groups of four per line, so the box keeps the same shape everywhere
    secretValue: css`
      max-width: 34ch;
      text-align: center;
      text-wrap: balance;
    `
  }
})
