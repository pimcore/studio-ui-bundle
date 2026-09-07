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

export const useStyles = createStyles(({ token, css }) => {
  // the tint bleeds past the item's box by the shadow width, so the label is inside it too
  const tint = (color: string): ReturnType<typeof css> => css`
    background: ${color};
    box-shadow: 0 0 0 ${token.paddingXXS}px ${color};
  `

  return {
    annotated: css`
      border-radius: ${token.borderRadiusSM}px;

      .ant-form-item-extra {
        color: ${token.colorTextSecondary};
      }
    `,
    added: tint(token.colorSuccessBg),
    changed: tint(token.colorWarningBg),
    removed: tint(token.colorErrorBg),
    moved: tint(token.colorFillQuaternary)
  }
})
