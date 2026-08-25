/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { enrichRowData } from './column-definition'
import { type ManyToManyRelationValueItem } from '@Pimcore/components/many-to-many-relation/hooks/use-value'

const row: ManyToManyRelationValueItem = {
  id: 42,
  type: 'object',
  subtype: 'Product',
  fullPath: '/path/to/element',
  isPublished: true,
  hasViewAccess: false
}

const visibleField = (key: string): never => {
  const field: Record<string, unknown> = { key }
  return field as never
}

const columnData = (key: string, value: unknown): never => {
  const column: Record<string, unknown> = { key, value }
  return column as never
}

describe('enrichRowData', () => {
  it('adds visible field values to the row', () => {
    const enriched = enrichRowData(
      [visibleField('name')],
      row,
      [columnData('name', 'My product')]
    )

    expect(enriched.name).toBe('My product')
  })

  it('does not let a visible field named hasViewAccess overwrite the permission flag', () => {
    const enriched = enrichRowData(
      [visibleField('hasViewAccess')],
      row,
      [columnData('hasViewAccess', true)]
    )

    expect(enriched.hasViewAccess).toBe(false)
  })
})
