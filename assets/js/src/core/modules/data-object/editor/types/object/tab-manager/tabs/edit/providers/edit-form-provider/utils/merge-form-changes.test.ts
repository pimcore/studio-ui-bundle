/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { mergeFormChanges } from './merge-form-changes'
import { type DynamicTypeObjectDataRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-registry'
import { DynamicTypeObjectDataLocalizedFields } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-localized-fields'

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-abstract', () => ({
  DynamicTypeObjectDataAbstract: class DynamicTypeObjectDataAbstract {} // eslint-disable-line @typescript-eslint/no-extraneous-class
}))

jest.mock('@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/localized-fields/object-localized-fields', () => ({
  ObjectLocalizedFields: () => null
}))

jest.mock('@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/localized-fields/versions/version-object-localized-fields', () => ({
  VersionObjectLocalizedFields: () => null
}))

const createMockRegistry = (types: Record<string, any> = {}): DynamicTypeObjectDataRegistry => ({
  hasDynamicType: (id: string) => id in types,
  getDynamicType: (id: string) => types[id]
} as unknown as DynamicTypeObjectDataRegistry)

const emptyMap = new Map<string, string>()

describe('mergeFormChanges', () => {
  it('replaces unknown field types wholesale (default fallback)', () => {
    const registry = createMockRegistry()
    expect(mergeFormChanges({ sku: 'old' }, { sku: 'new' }, registry, emptyMap)).toEqual({ sku: 'new' })
  })

  it('preserves unrelated fields in current when merging', () => {
    const registry = createMockRegistry()
    expect(mergeFormChanges({ sku: 'old', name: 'keep' }, { sku: 'new' }, registry, emptyMap)).toEqual({
      sku: 'new',
      name: 'keep'
    })
  })

  it('replaces an array field wholesale, not by index', () => {
    const registry = createMockRegistry()
    expect(mergeFormChanges({ tags: ['a', 'b', 'c'] }, { tags: ['x'] }, registry, emptyMap)).toEqual({
      tags: ['x']
    })
  })

  it('replaces a null field value wholesale', () => {
    const registry = createMockRegistry()
    expect(mergeFormChanges({ image: { id: 42 } }, { image: null }, registry, emptyMap)).toEqual({
      image: null
    })
  })

  it('dispatches to mergeChangedValues when the dynamic type implements it', () => {
    const mergeChangedValues = jest.fn().mockReturnValue({
      name: { de: 'Hallo', en: 'Hello' }
    })
    const localizedFields = { mergeChangedValues }
    const registry = createMockRegistry({ localizedfields: localizedFields })
    const fieldTypeMap = new Map([['localizedfields', 'localizedfields']])

    const current = { localizedfields: { name: { de: 'Hallo' } } }
    const incoming = { localizedfields: { name: { en: 'Hello' } } }

    expect(mergeFormChanges(current, incoming, registry, fieldTypeMap)).toEqual({
      localizedfields: { name: { de: 'Hallo', en: 'Hello' } }
    })
    expect(mergeChangedValues).toHaveBeenCalledWith(current.localizedfields, incoming.localizedfields)
  })

  it('accumulates multiple localized field changes without losing previous ones', () => {
    const registry = createMockRegistry({ localizedfields: new DynamicTypeObjectDataLocalizedFields() })
    const fieldTypeMap = new Map([['localizedfields', 'localizedfields']])

    let state: Record<string, any> = {}

    state = mergeFormChanges(state, { localizedfields: { name: { de: 'Hallo' } } }, registry, fieldTypeMap)
    state = mergeFormChanges(state, { localizedfields: { title: { de: 'Titel' } } }, registry, fieldTypeMap)
    state = mergeFormChanges(state, { localizedfields: { name: { en: 'Hello' } } }, registry, fieldTypeMap)

    expect(state).toEqual({
      localizedfields: {
        name: { de: 'Hallo', en: 'Hello' },
        title: { de: 'Titel' }
      }
    })
  })

  it('mixes localized and non-localized field changes correctly', () => {
    const registry = createMockRegistry({ localizedfields: new DynamicTypeObjectDataLocalizedFields() })
    const fieldTypeMap = new Map([['localizedfields', 'localizedfields']])

    let state: Record<string, any> = {}

    state = mergeFormChanges(state, { sku: 'ABC' }, registry, emptyMap)
    state = mergeFormChanges(state, { localizedfields: { name: { de: 'Hallo' } } }, registry, fieldTypeMap)
    state = mergeFormChanges(state, { localizedfields: { name: { en: 'Hello' } } }, registry, fieldTypeMap)
    state = mergeFormChanges(state, { sku: 'XYZ' }, registry, emptyMap)

    expect(state).toEqual({
      sku: 'XYZ',
      localizedfields: { name: { de: 'Hallo', en: 'Hello' } }
    })
  })

  it('does not dispatch mergeChangedValues when field name has no type mapping', () => {
    const mergeChangedValues = jest.fn().mockReturnValue({})
    const localizedFields = { mergeChangedValues }
    const registry = createMockRegistry({ localizedfields: localizedFields })

    const current = { localizedfields: { name: { de: 'Hallo' } } }
    const incoming = { localizedfields: { name: { en: 'Hello' } } }

    expect(mergeFormChanges(current, incoming, registry, emptyMap)).toEqual({
      localizedfields: { name: { en: 'Hello' } }
    })
    expect(mergeChangedValues).not.toHaveBeenCalled()
  })
})
