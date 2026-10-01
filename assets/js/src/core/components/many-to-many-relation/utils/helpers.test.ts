/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { getElementCellConfig, getRelationRowId } from './helpers'
import { type DisplayManyToManyRelationValueItem, type ManyToManyRelationValueItem } from '../hooks/use-value'

const getElementInfoFor = (item: Partial<ManyToManyRelationValueItem>): ReturnType<NonNullable<ReturnType<typeof getElementCellConfig>['getElementInfo']>> => {
  const config = getElementCellConfig(false)
  const cellProps: Record<string, unknown> = { row: { original: item } }
  return config.getElementInfo!(cellProps as never)
}

const item: Partial<ManyToManyRelationValueItem> = {
  id: 42,
  type: 'object',
  subtype: 'Product',
  fullPath: '/path/to/element',
  isPublished: true
}

describe('getElementCellConfig', () => {
  it('exposes the element id when hasViewAccess is not set', () => {
    expect(getElementInfoFor(item).id).toBe(42)
  })

  it('exposes the element id when hasViewAccess is true', () => {
    expect(getElementInfoFor({ ...item, hasViewAccess: true }).id).toBe(42)
  })

  it('omits the element id when hasViewAccess is false, so the path tag is not clickable', () => {
    const info = getElementInfoFor({ ...item, hasViewAccess: false })
    expect(info.id).toBeUndefined()
    expect(info.fullPath).toBe('/path/to/element')
  })
})

describe('getRelationRowId', () => {
  /**
   * The grid feeds this to `setRowId` and resolves drag ids with the same function. The two must
   * agree: matching a drag id against the element id instead compares a position against an
   * element id, so reordering silently returns the data unchanged.
   */
  const row = (id: number, originalIndex?: number): DisplayManyToManyRelationValueItem => ({
    id,
    type: 'object',
    subtype: 'Product',
    fullPath: `/path/to/${id}`,
    isPublished: true,
    ...(originalIndex === undefined ? {} : { originalIndex })
  })

  const rows = [row(10, 0), row(20, 1), row(10, 2)]

  it('identifies rows by position, so a repeated element does not collide', () => {
    const ids = rows.map(getRelationRowId)

    expect(ids).toEqual(['0', '1', '2'])
    expect(new Set(ids).size).toBe(rows.length)
  })

  it('falls back to the current index when originalIndex is absent', () => {
    expect(getRelationRowId(row(10), 3)).toBe('3')
  })

  it('resolves a drag id back to the row it came from', () => {
    const dragged = getRelationRowId(rows[2], 2)
    const resolved = rows.findIndex((row, index) => getRelationRowId(row, index) === dragged)

    // the third row, not the first one sharing element id 10
    expect(resolved).toBe(2)
  })
})
