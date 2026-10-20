/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type CSSProperties } from 'react'

export interface CellStyleOptions {
  size: number
  isAutoWidth: boolean
  // Row virtualization lays the header row and the body rows out as flex containers instead
  // of table rows, so the cells are flex items rather than table cells.
  isFlexRow: boolean
  // Whether this grid needs its columns to share the width the table has left over.
  distributeWidth: boolean
}

export const getCellStyle = ({ size, isAutoWidth, isFlexRow, distributeWidth }: CellStyleOptions): CSSProperties => {
  if (isAutoWidth) {
    return {
      width: 'auto',
      minWidth: size,
      ...(isFlexRow ? { flexBasis: size, flexShrink: 1, flexGrow: 1 } : {})
    }
  }

  if (isFlexRow && distributeWidth) {
    return {
      width: size,
      flexBasis: size,
      flexGrow: size,
      flexShrink: 0,
      // A flex item is at least as wide as its content by default, which would let a long
      // value push its column past the width the table gave it. maxWidth cannot be used
      // here instead, as it would also cap the growth.
      minWidth: 0
    }
  }

  return {
    width: size,
    maxWidth: size,
    ...(isFlexRow ? { flexShrink: 0 } : {})
  }
}
