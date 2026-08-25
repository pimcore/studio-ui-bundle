/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type DragAndDropInfo } from './droppable'
import {
  elementDragTypes,
  getDraggedElementCount,
  getDraggedElements,
  isElementDrag,
  isElementListDragType,
  toElementListDragType,
  toElementType
} from './element-drag'

const info = (type: string, data: any): DragAndDropInfo => ({
  type,
  data,
  icon: { value: 'folder' },
  title: 'drag'
})

describe('element drag types', () => {
  it('derives the list type of an element type', () => {
    expect(toElementListDragType('asset')).toBe('asset-list')
    expect(toElementListDragType('document')).toBe('document-list')
    expect(toElementListDragType('data-object')).toBe('data-object-list')
  })

  it('recognises the list form', () => {
    expect(isElementListDragType('asset-list')).toBe(true)
    expect(isElementListDragType('asset')).toBe(false)
  })

  it('maps a drag type back to its element type', () => {
    expect(toElementType('data-object-list')).toBe('data-object')
    expect(toElementType('data-object')).toBe('data-object')
  })

  it('expands element types into the drag types a multi target accepts', () => {
    expect(elementDragTypes(['asset', 'document'])).toEqual([
      'asset', 'asset-list', 'document', 'document-list'
    ])
  })

  it('matches both forms against allowed element types', () => {
    expect(isElementDrag(info('asset', {}), ['asset'])).toBe(true)
    expect(isElementDrag(info('asset-list', []), ['asset'])).toBe(true)
    expect(isElementDrag(info('document-list', []), ['asset'])).toBe(false)
  })
})

describe('getDraggedElements', () => {
  it('wraps a single element into a list', () => {
    expect(getDraggedElements(info('asset', { id: 7 }))).toEqual([{ id: 7 }])
  })

  it('returns the whole list of a list drag', () => {
    const elements = [{ id: 7 }, { id: 8 }]

    expect(getDraggedElements(info('asset-list', elements))).toEqual(elements)
    expect(getDraggedElementCount(info('asset-list', elements))).toBe(2)
  })

  it('returns nothing for an empty payload', () => {
    expect(getDraggedElements(info('asset', null))).toEqual([])
    expect(getDraggedElements(info('asset', undefined))).toEqual([])
  })

  it('does not trust a list type carrying a single object', () => {
    expect(getDraggedElements(info('asset-list', { id: 7 }))).toEqual([])
  })
})
