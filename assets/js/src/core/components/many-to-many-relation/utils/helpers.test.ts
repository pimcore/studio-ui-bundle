/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { getElementCellConfig } from './helpers'
import { type ManyToManyRelationValueItem } from '../hooks/use-value'

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
