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
    // Set apart from the options by a hairline, as other select footers in Studio. The field has
    // 8px of room on every side: below the hairline and to the dropdown's edges, whose own 4px
    // padding makes up the rest at the sides and the bottom.
    footer: css`
      margin-top: ${token.marginXXS}px;
      padding: ${token.paddingXS}px ${token.paddingXXS}px ${token.paddingXXS}px;
      border-top: 1px solid ${token.colorBorderSecondary};
    `,

    // Default size: an option row's height and the input radius. The small inner padding keeps
    // the text starting where the option labels start, despite the room around the field.
    field: css`
      width: 100%;

      &.ant-input,
      .ant-input-number-input {
        padding-inline: ${token.controlPaddingHorizontalSM - token.lineWidth}px;
      }
    `,

    message: css`
      display: block;
      padding: ${token.paddingXXS}px ${token.controlPaddingHorizontalSM}px 0;
    `,

    visuallyHidden: css`
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip: rect(0 0 0 0);
      white-space: nowrap;
      border: 0;
    `
  }
})
