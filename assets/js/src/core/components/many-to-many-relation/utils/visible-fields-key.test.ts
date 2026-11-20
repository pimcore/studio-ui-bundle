/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import {
  buildVisibleFieldsLookup,
  findVisibleFieldsEntry,
  getTypedVisibleFieldsKey,
  VISIBLE_FIELDS_ELEMENT_TYPE
} from './visible-fields-key'

describe('visible fields key', () => {
  it('finds the entries of an object relation by id, as before', () => {
    const lookup = buildVisibleFieldsLookup([{ id: 7, name: 'Chair' }, undefined, { name: 'no id' }])

    expect(findVisibleFieldsEntry(lookup, { id: 7, type: 'object' })).toEqual({ id: 7, name: 'Chair' })
    expect(findVisibleFieldsEntry(lookup, { id: 7, type: 'data-object' })).toEqual({ id: 7, name: 'Chair' })
    expect(lookup.size).toBe(1)
  })

  it('keeps elements of different types with the same id apart', () => {
    const lookup = buildVisibleFieldsLookup([
      { id: 7, filename: 'chair.jpg', [VISIBLE_FIELDS_ELEMENT_TYPE]: 'asset' },
      { id: 7, name: 'Chair', [VISIBLE_FIELDS_ELEMENT_TYPE]: 'object' }
    ])

    expect(findVisibleFieldsEntry(lookup, { id: 7, type: 'asset' })?.filename).toBe('chair.jpg')
    expect(findVisibleFieldsEntry(lookup, { id: 7, type: 'data-object' })?.name).toBe('Chair')
    expect(findVisibleFieldsEntry(lookup, { id: 7, type: 'document' })).toBeUndefined()
  })

  it('hides the element type from the values of an entry', () => {
    const entry = { id: 7, filename: 'chair.jpg', [VISIBLE_FIELDS_ELEMENT_TYPE]: 'asset' }

    expect(Object.values(entry)).toEqual([7, 'chair.jpg'])
    expect(JSON.stringify(entry)).toBe('{"id":7,"filename":"chair.jpg"}')
  })

  it('normalizes the element type of the key', () => {
    expect(getTypedVisibleFieldsKey('data-object', 3)).toBe('object:3')
    expect(getTypedVisibleFieldsKey('object', 3)).toBe('object:3')
    expect(getTypedVisibleFieldsKey('asset', 3)).toBe('asset:3')
  })

  it('finds nothing without a lookup', () => {
    expect(findVisibleFieldsEntry(null, { id: 1, type: 'asset' })).toBeUndefined()
  })
})
