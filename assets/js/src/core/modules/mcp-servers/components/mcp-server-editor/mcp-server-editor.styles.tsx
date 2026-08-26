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
    mask: css`
      height: 100%;
      overflow-y: auto;
      padding: ${token.paddingSM}px;
    `,

    urlRow: css`
      padding: ${token.paddingXS}px;
      background-color: ${token.colorFillTertiary};
      border-radius: ${token.borderRadius}px;
    `,

    urlText: css`
      word-break: break-all;
    `,

    hint: css`
      color: ${token.colorTextSecondary};
    `
  }
})
