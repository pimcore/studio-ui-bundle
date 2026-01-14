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
    wysiwygEditor: css`
      &.versionFieldItemHighlight {
        > div {
          background-color: ${token.Colors.Brand.Warning.colorWarningBg} !important;
        }
      }
    `,

    disabledEditor: css`
      background-color: ${token.colorBgContainerDisabled};
      color: ${token.colorTextDisabled};
      border: 1px solid ${token.colorBorder};
      padding: 5px 11px;
      cursor: not-allowed;
      border-radius: ${token.borderRadius}px;
      overflow: auto;

      &.versionFieldItemHighlight {
        background-color: ${token.Colors.Brand.Warning.colorWarningBg} !important;
      }
    `
  }
})
