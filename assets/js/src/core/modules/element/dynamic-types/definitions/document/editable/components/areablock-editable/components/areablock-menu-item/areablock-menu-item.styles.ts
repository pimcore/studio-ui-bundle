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

export const useStyles = createStyles(({ token }) => ({

  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: token.marginSM,
    // Pulls the buttons back towards the edge of the menu, which antd pads for text.
    marginRight: -token.marginXXS
  },

  name: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },

  positions: {
    display: 'inline-flex',
    alignItems: 'center',
    // Tighter than marginXXS, so the pair reads as one control rather than two.
    gap: 2,
    flex: 'none'
  },

  // Less chrome around the glyph than a small IconButton gives: a 16px icon in a
  // 20px box instead of a 14px icon in a 24px one. Doubled selector to land after
  // the icon-button size rule.
  positionButton: {
    '&&': {
      width: 20,
      height: 20,
      padding: 2
    }
  }
}))
