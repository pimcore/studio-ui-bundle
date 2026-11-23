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
let relationProps: Record<string, any> = {}

jest.mock('../../hooks/use-element-published-states', () => ({
  useElementPublishedStates: () => publishedStates
}))

jest.mock('@sdk/modules/element', () => ({
  ManyToOneRelation: (props: Record<string, any>) => {
    relationProps = props
    return null
  }
}))

jest.mock('../editable-overlay/editable-overlay', () => ({
  EditableOverlay: ({ children }: { children: React.ReactNode }) => children
}))

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width', () => ({
  useFieldWidth: () => ({ large: 600 })
}))

jest.mock('@sdk/utils', () => ({
  toCssDimension: (value: unknown, fallback: unknown) => value ?? fallback
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { render } from '@testing-library/react'
// eslint-disable-next-line import/first
import { RelationEditable } from './relation-editable'

describe('RelationEditable', () => {
  beforeEach(() => {
    publishedStates = {}
    relationProps = {}
  })

  it('passes the published state looked up for the related element to the relation', () => {
    publishedStates = { 'document:7': false }

    render(<RelationEditable value={ { id: 7, type: 'document', fullPath: '/en/unpublished' } } />)

    expect(relationProps.value).toEqual({ id: 7, type: 'document', fullPath: '/en/unpublished', isPublished: false })
  })

  it('keeps the value as it is while the published state is not known yet', () => {
    const value = { id: 7, type: 'document', fullPath: '/en/unpublished' }

    render(<RelationEditable value={ value } />)

    expect(relationProps.value).toBe(value)
  })

  it('does not change the value for an empty relation or a path text input', () => {
    const { rerender } = render(<RelationEditable value={ null } />)
    expect(relationProps.value).toBeNull()

    const textInput = { textInput: true as const, fullPath: '/some/path' }
    rerender(<RelationEditable value={ textInput } />)
    expect(relationProps.value).toBe(textInput)
  })

  it('overwrites an inherited value with the value as stored, without the looked up state', () => {
    publishedStates = { 'document:7': false }
    const onChange = jest.fn()
    const value = { id: 7, type: 'document', fullPath: '/en/unpublished' }

    render(<RelationEditable
      inherited
      onChange={ onChange }
      value={ value }
           />)
    relationProps.onChange?.(value)

    expect(onChange).toHaveBeenCalledWith(value)
    expect(onChange.mock.calls[0][0]).not.toHaveProperty('isPublished')
  })
})
