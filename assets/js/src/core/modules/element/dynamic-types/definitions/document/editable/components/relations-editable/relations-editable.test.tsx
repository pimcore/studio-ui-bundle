/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

let publishedStates: Record<string, boolean | null> = {}
let relationsProps: Record<string, any> = {}

jest.mock('../../hooks/use-element-published-states', () => ({
  useElementPublishedStates: () => publishedStates
}))

jest.mock('@Pimcore/components/many-to-many-relation', () => ({
  ManyToManyRelation: (props: Record<string, any>) => {
    relationsProps = props
    return null
  }
}))

jest.mock('../editable-overlay/editable-overlay', () => ({
  EditableOverlay: ({ children }: { children: React.ReactNode }) => children
}))

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width', () => ({
  useFieldWidth: () => ({ large: 600 })
}))

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/components/label/label', () => ({
  ManyToManyRelationLabel: () => null
}))

jest.mock('@sdk/utils', () => ({
  toCssDimension: (value: unknown, fallback: unknown) => value ?? fallback
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { render } from '@testing-library/react'
// eslint-disable-next-line import/first
import { RelationsEditable } from './relations-editable'

const baseProps = { allowToClearRelation: true, maxItems: null, pathFormatterClass: null, width: null, height: null }

const items = [
  { id: 7, type: 'document', fullPath: '/en/unpublished', subtype: 'snippet', isPublished: null },
  { id: 8, type: 'object', fullPath: '/products/car', subtype: 'Car', isPublished: null },
  { id: 9, type: 'asset', fullPath: '/images/a.png', subtype: 'image', isPublished: null }
]

describe('RelationsEditable', () => {
  beforeEach(() => {
    publishedStates = {}
    relationsProps = {}
  })

  it('passes the looked up published state of each related element to the relations', () => {
    publishedStates = { 'document:7': false, 'data-object:8': true }

    render(<RelationsEditable
      { ...baseProps }
      value={ items }
           />)

    expect(relationsProps.value.map((item: { isPublished: boolean | null }) => item.isPublished)).toEqual([false, true, null])
  })

  it('keeps the value as it is while no published state is known yet', () => {
    render(<RelationsEditable
      { ...baseProps }
      value={ items }
           />)

    expect(relationsProps.value).toBe(items)
  })

  it('keeps the same value between renders as long as the states do not change', () => {
    publishedStates = { 'document:7': false }

    const { rerender } = render(<RelationsEditable
      { ...baseProps }
      value={ items }
                                />)
    const first = relationsProps.value
    rerender(<RelationsEditable
      { ...baseProps }
      value={ items }
             />)

    expect(relationsProps.value).toBe(first)
  })

  it('passes an empty relation on unchanged', () => {
    render(<RelationsEditable
      { ...baseProps }
      value={ null }
           />)

    expect(relationsProps.value).toBeNull()
  })

  it('overwrites an inherited value with the value as stored, without the looked up state', () => {
    publishedStates = { 'document:7': false }
    const onChange = jest.fn()

    render(<RelationsEditable
      { ...baseProps }
      inherited
      onChange={ onChange }
      value={ items }
           />)
    relationsProps.onChange?.(items)

    expect(onChange).toHaveBeenCalledWith(items)
  })
})
