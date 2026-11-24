/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { labelDeletedRelations } from './label-deleted-relations'

jest.mock('i18next', () => ({
  t: (key: string, options?: Record<string, unknown>) => `${key}:${String(options?.type)}:${String(options?.id)}`
}))

const deletedEntry = (type: string, id: number): Record<string, unknown> => ({
  id,
  type,
  subtype: '',
  fullPath: '',
  isPublished: null,
  hasViewAccess: false,
  isDeleted: true
})

describe('labelDeletedRelations', () => {
  it('labels a deleted many-to-one relation', () => {
    expect(labelDeletedRelations('manyToOneRelation', deletedEntry('asset', 12))).toEqual({
      ...deletedEntry('asset', 12),
      fullPath: 'version.deleted-relation:asset:12'
    })
  })

  it('labels only the deleted entries of many-to-many relations', () => {
    const existing = { id: 1, type: 'object', subtype: 'Car', fullPath: '/cars/first', isPublished: true }

    expect(labelDeletedRelations('manyToManyRelation', [existing, deletedEntry('document', 2)])).toEqual([
      existing,
      { ...deletedEntry('document', 2), fullPath: 'version.deleted-relation:document:2' }
    ])
    expect(labelDeletedRelations('manyToManyObjectRelation', [deletedEntry('object', 5)])).toEqual([
      { ...deletedEntry('object', 5), fullPath: 'version.deleted-relation:object:5' }
    ])
  })

  it('keeps values of other field types and empty values unchanged', () => {
    const value = [deletedEntry('object', 1)]

    expect(labelDeletedRelations('input', value)).toBe(value)
    expect(labelDeletedRelations('manyToOneRelation', null)).toBeNull()
    expect(labelDeletedRelations('manyToManyRelation', undefined)).toBeUndefined()
  })
})
