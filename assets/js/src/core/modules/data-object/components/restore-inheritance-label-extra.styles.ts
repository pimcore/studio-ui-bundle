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

export const useStyles = createStyles(({ css, token }) => ({
  // Placed on the label's first line, not centered on the label row: the row is
  // taller than that line - both hosts pad it, and the virtual item adds the
  // descender of the inline box its label text sits in - so centering on the row
  // leaves the action a couple of pixels below the field name. Starting at the top of
  // the row and taking exactly one line box (1lh, the line height the label renders
  // at, whatever that is) puts the action on the same line as the field name in a
  // label of any size, and keeps it from growing the row, which is at least one line
  // tall already, when it appears or disappears.
  action: css`
    margin-inline-start: ${token.marginXXS}px;
    align-self: flex-start;
    height: 1lh;
  `,

  // Sized and placed from the label text it separates: one em tall, and without the
  // 0.06em Ant lifts a vertical divider by for a text baseline, which in a label row
  // reads as the whole action sitting low.
  divider: css`
    &&.ant-divider {
      border-color: ${token.colorBorder};
      height: 1em;
      margin: 0;
      top: 0;
    }
  `
}))
