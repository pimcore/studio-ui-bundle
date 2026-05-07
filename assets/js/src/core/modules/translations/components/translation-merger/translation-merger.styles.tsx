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

export const useStyle = createStyles(({ token, css }) => {
  return {
    mergerContainer: css`
      display: flex;
      flex-direction: column;
      height: 100%;

      .toolbar-label {
        font-size: ${token.fontSizeSM}px;
        color: ${token.colorTextSecondary};
        margin-right: ${token.marginMD}px;
      }

      .row-conflict {
        background-color: ${token.Colors.Brand.Warning.colorWarningBg} !important;
      }
    `
  }
})
