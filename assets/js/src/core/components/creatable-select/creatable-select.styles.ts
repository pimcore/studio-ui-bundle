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
    // Set apart from the options by a hairline, as other select footers in Studio, on the
    // dropdown's own 4px rhythm: the field sits as far from the hairline as from the edge.
    footer: css`
      margin-top: ${token.marginXXS}px;
      padding-top: ${token.paddingXXS}px;
      border-top: 1px solid ${token.colorBorderSecondary};
    `,

    // Default size: an option row's height, the input radius, and text starting where the
    // option labels start.
    field: css`
      width: 100%;
    `,

    message: css`
      display: block;
      padding: ${token.paddingXXS}px ${token.controlPaddingHorizontal}px 0;
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
