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

/**
 * Width styles for a header or a body cell, shared by both so a column cannot end up sized
 * differently in the header than in the rows.
 *
 * While row virtualization is on, the rows are flex containers, so the browser no longer
 * applies the fixed-table-layout rule that spreads the width a table has left over after its
 * columns across those columns. `distributeWidth` reproduces that rule: a `flex-grow`
 * proportional to the column width distributes the leftover width exactly as the table layout
 * would. Without it the columns only cover their own widths and the grid looks narrower as
 * soon as virtualization kicks in (PEES-1355).
 *
 * Grids with an auto-width column already have a cell that absorbs the leftover width, so
 * there `distributeWidth` stays off and the remaining columns keep their fixed size.
 *
 * An auto-width cell states that width as its flex base as well. `width: auto` would leave the
 * base up to the content, and the leftover width is shared out from those bases: the header row
 * and every body row would start from the value they happen to hold and end up with column
 * widths of their own. The fixed table layout ignores the content in the same way.
 */
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
