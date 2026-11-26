/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { render, renderHook, screen } from '@testing-library/react'
import { type AbstractObjectDataDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-abstract'
import { componentConfig } from '@Pimcore/modules/app/component-registry/component-config'
import { useFieldAddons } from './use-field-addons'

let mockSlotEntries: Record<string, unknown[]> = {}
jest.mock('@Pimcore/modules/app/component-registry/use-component-registry', () => {
  const registry = { getSlotComponents: (slot: string) => mockSlotEntries[slot] ?? [] }
  return { useComponentRegistry: () => registry }
})

let mockElementContext: { id: number, elementType: string } | null = { id: 42, elementType: 'data-object' }
jest.mock('@Pimcore/modules/element/hooks/use-element-context', () => ({
  useOptionalElementContext: () => mockElementContext
}))

let mockClassName: string | undefined = 'Product'
jest.mock('@sdk/app', () => ({
  useAppSelector: (selector: (state: unknown) => unknown) => selector({})
}))
jest.mock('@Pimcore/modules/data-object/data-object-draft-slice', () => ({
  selectDataObjectById: (_state: unknown, id: number) => mockClassName === undefined ? undefined : { id, className: mockClassName }
}))

let mockLocalizedFields: { locales: string[] } | undefined
jest.mock('@Pimcore/components/form/localisation/localized-fields/provider/localized-fields-provider/use-localized-fields', () => ({
  useLocalizedFields: () => mockLocalizedFields
}))

jest.mock('@Pimcore/modules/app/component-registry/slot-renderer', () => ({
  SlotRenderer: ({ slot, props }: { slot: string, props: Record<string, unknown> }) => (
    <span data-testid={ slot }>{ JSON.stringify(props) }</span>
  )
}))

const slots = componentConfig.dataObject.editor.field
const fieldDefinition = { name: 'height', fieldtype: 'numeric' } as unknown as AbstractObjectDataDefinition
const fieldPath = ['attributes', 'Dimensions', 'height']

const renderAddons = (): ReturnType<typeof useFieldAddons> => renderHook(() => useFieldAddons(fieldDefinition, fieldPath)).result.current

describe('useFieldAddons', () => {
  beforeEach(() => {
    mockSlotEntries = {}
    mockElementContext = { id: 42, elementType: 'data-object' }
    mockClassName = 'Product'
    mockLocalizedFields = undefined
  })

  it('names the three slots in the component config', () => {
    expect(slots.after.name).toBe('dataObject.editor.field.after')
    expect(slots.below.name).toBe('dataObject.editor.field.below')
    expect(slots.label.name).toBe('dataObject.editor.field.label')
  })

  it('leaves every slot undefined while nothing is registered', () => {
    expect(renderAddons()).toEqual({ after: undefined, below: undefined, label: undefined })
  })

  it('renders only the slots that have entries', () => {
    mockSlotEntries = { [slots.after.name]: [{ name: 'manufacturer' }] }

    const addons = renderAddons()

    expect(addons.after).toBeDefined()
    expect(addons.below).toBeUndefined()
    expect(addons.label).toBeUndefined()
  })

  it('renders nothing for a field without a path, i.e. outside the edit form', () => {
    mockSlotEntries = { [slots.after.name]: [{ name: 'manufacturer' }] }

    expect(renderHook(() => useFieldAddons(fieldDefinition, undefined)).result.current).toEqual({})
  })

  it('renders nothing outside a data object', () => {
    mockSlotEntries = { [slots.after.name]: [{ name: 'manufacturer' }] }
    mockElementContext = { id: 7, elementType: 'asset' }

    expect(renderAddons()).toEqual({})
  })

  it('hands the field context to the registered components', () => {
    mockSlotEntries = { [slots.below.name]: [{ name: 'erp' }] }

    render(<>{ renderAddons().below }</>)

    expect(JSON.parse(screen.getByTestId(slots.below.name).textContent ?? '')).toEqual({
      objectId: 42,
      className: 'Product',
      fieldDefinition: { name: 'height', fieldtype: 'numeric' },
      fieldPath: ['attributes', 'Dimensions', 'height']
    })
  })

  it('passes the locale of a localized field', () => {
    mockSlotEntries = { [slots.label.name]: [{ name: 'translate' }] }
    mockLocalizedFields = { locales: ['de'] }

    render(<>{ renderAddons().label }</>)

    expect(JSON.parse(screen.getByTestId(slots.label.name).textContent ?? '')).toMatchObject({ locale: 'de' })
  })

  it('waits for the object draft to know its class', () => {
    mockSlotEntries = { [slots.after.name]: [{ name: 'manufacturer' }] }
    mockClassName = undefined

    const { container } = render(<>{ renderAddons().after }</>)

    expect(container).toBeEmptyDOMElement()
  })
})
