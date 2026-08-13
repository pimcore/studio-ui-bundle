/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { getCellStyle } from './cell-style'

describe('getCellStyle', () => {
  describe('without row virtualization', () => {
    it('pins a fixed column to its size', () => {
      expect(getCellStyle({ size: 150, isAutoWidth: false, isFlexRow: false, distributeWidth: false }))
        .toEqual({ width: 150, maxWidth: 150 })
    })

    it('lets an auto-width column grow from its size', () => {
      expect(getCellStyle({ size: 200, isAutoWidth: true, isFlexRow: false, distributeWidth: false }))
        .toEqual({ width: 'auto', minWidth: 200 })
    })
  })

  describe('with row virtualization', () => {
    it('gives the auto-width column the leftover width', () => {
      expect(getCellStyle({ size: 200, isAutoWidth: true, isFlexRow: true, distributeWidth: false }))
        .toEqual({ width: 'auto', minWidth: 200, flexBasis: 200, flexShrink: 1, flexGrow: 1 })
    })

    // Regression guard for the report view column alignment. A flex item with `width: auto`
    // takes its flex base from its content, so an auto-width column was sized by the value that
    // happened to be in it. The header row and every body row then split the leftover width
    // from a different base and each ended up with its own column widths.
    it('sizes an auto-width column from its width rather than from its content', () => {
      expect(getCellStyle({ size: 200, isAutoWidth: true, isFlexRow: true, distributeWidth: false }))
        .toHaveProperty('flexBasis', 200)
    })

    it('keeps fixed columns fixed while another column absorbs the leftover width', () => {
      expect(getCellStyle({ size: 150, isAutoWidth: false, isFlexRow: true, distributeWidth: false }))
        .toEqual({ width: 150, maxWidth: 150, flexShrink: 0 })
    })

    // Regression guard for PEES-1355. The rows are flex containers here, so the fixed table
    // layout no longer spreads the width the table has left over across the columns. Grids
    // with no auto-width column have to do it themselves, or the columns stop covering the
    // table as soon as virtualization kicks in.
    describe('and no column to absorb the leftover width', () => {
      it('grows every column in proportion to its width', () => {
        expect(getCellStyle({ size: 150, isAutoWidth: false, isFlexRow: true, distributeWidth: true }))
          .toEqual({ width: 150, flexBasis: 150, flexGrow: 150, flexShrink: 0, minWidth: 0 })
      })

      it('distributes the leftover width the way a fixed table layout would', () => {
        // The columns of the grid in PEES-1355, and the width its table had left over.
        const sizes = [50, 100, 200, 150, 150, 110]
        const total = sizes.reduce((sum, size) => sum + size, 0)
        const leftover = 233

        const shares = sizes.map(size => {
          const { flexGrow } = getCellStyle({ size, isAutoWidth: false, isFlexRow: true, distributeWidth: true })

          return leftover * (flexGrow as number) / total
        })

        // Every column is widened by the same fraction of its own width...
        shares.forEach((share, index) => {
          expect(share / sizes[index]).toBeCloseTo(leftover / total)
        })

        // ...and together they take up exactly the width that was left over.
        expect(shares.reduce((sum, share) => sum + share, 0)).toBeCloseTo(leftover)
      })

      it('drops the maxWidth cap, which would otherwise block the growth', () => {
        expect(getCellStyle({ size: 150, isAutoWidth: false, isFlexRow: true, distributeWidth: true }))
          .not.toHaveProperty('maxWidth')
      })

      it('stops long content from pushing a column past its allotted width', () => {
        // Flex items are at least as wide as their content unless min-width says otherwise.
        expect(getCellStyle({ size: 150, isAutoWidth: false, isFlexRow: true, distributeWidth: true }))
          .toHaveProperty('minWidth', 0)
      })

      it('still hands the whole leftover width to an auto-width column when there is one', () => {
        expect(getCellStyle({ size: 200, isAutoWidth: true, isFlexRow: true, distributeWidth: true }))
          .toEqual({ width: 'auto', minWidth: 200, flexBasis: 200, flexShrink: 1, flexGrow: 1 })
      })
    })
  })
})
