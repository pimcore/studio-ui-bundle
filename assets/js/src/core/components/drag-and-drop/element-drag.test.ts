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
  acceptsSingleElementOf,
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

describe('acceptsSingleElementOf', () => {
  // the validators of a single image field
  const isValidContext = (dragInfo: DragAndDropInfo): boolean => ['asset', 'document', 'data-object'].includes(dragInfo.type)
  const isValidData = (dragInfo: DragAndDropInfo): boolean => dragInfo.type === 'asset' && dragInfo.data.type === 'image'

  it('is true when one dragged element would be accepted on its own', () => {
    const set = info('asset-list', [{ id: 1, type: 'video' }, { id: 2, type: 'image' }])

    expect(acceptsSingleElementOf(set, isValidContext, isValidData)).toBe(true)
  })

  it('is false when no dragged element would be accepted on its own', () => {
    const set = info('asset-list', [{ id: 1, type: 'video' }, { id: 2, type: 'document' }])

    expect(acceptsSingleElementOf(set, isValidContext, isValidData)).toBe(false)
  })

  it('is false for a single element drag, which the target judges directly', () => {
    expect(acceptsSingleElementOf(info('asset', { id: 1, type: 'image' }), isValidContext, isValidData)).toBe(false)
  })

  it('hands every validator the single element form', () => {
    const seen: string[] = []
    const recordingContext = (dragInfo: DragAndDropInfo): boolean => {
      seen.push(`${dragInfo.type}:${String(dragInfo.data.id)}`)
      return false
    }

    acceptsSingleElementOf(info('data-object-list', [{ id: 1 }, { id: 2 }]), recordingContext)

    expect(seen).toEqual(['data-object:1', 'data-object:2'])
  })

  it('supports a boolean context and a missing data validator', () => {
    expect(acceptsSingleElementOf(info('asset-list', [{ id: 1 }]), true)).toBe(true)
    expect(acceptsSingleElementOf(info('asset-list', [{ id: 1 }]), false)).toBe(false)
  })

  it('treats a validator that throws as a refusal', () => {
    const throwing = (): boolean => { throw new Error('unexpected payload') }

    expect(acceptsSingleElementOf(info('asset-list', [{ id: 1 }]), throwing)).toBe(false)
  })
})
