/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

interface StubType {
  normalizeFieldDefinition: (fieldDef: Record<string, unknown>) => Record<string, unknown>
}

const stubRegistry = (types: Record<string, StubType>): any => ({
  hasDynamicType: (id: string) => id in types,
  getDynamicType: (id: string) => types[id]
})

const markAs = (marker: string): StubType => ({
  normalizeFieldDefinition: (fieldDef) => ({ ...fieldDef, normalizedBy: marker })
})

// the global registry knows only the core input type
const mockGlobalRegistry = stubRegistry({ input: markAs('global') })

jest.mock('@sdk/app', () => ({
  container: { get: () => mockGlobalRegistry },
  serviceIds: { 'DynamicTypes/FieldDefinitionRegistry': 'DynamicTypes/FieldDefinitionRegistry' }
}))

// the components barrel pulls antd-style (untranspiled ESM); reduce renders nothing
jest.mock('@sdk/components', () => ({ Icon: () => null }))

let mockUuidCounter = 0
jest.mock('@sdk/utils', () => ({ uuid: () => `id-${++mockUuidCounter}` }))

type FieldDefinitions = Record<string, Record<string, unknown>>

const { reduce } = jest.requireActual<{
  reduce: (props: { layout: unknown, registry?: unknown }) => { fieldDefinitions: FieldDefinitions }
}>('./layout-helpers')

const layout = {
  fieldtype: 'panel',
  name: 'root',
  children: [
    { fieldtype: 'input', name: 'title' },
    { fieldtype: 'asset', name: 'image' }
  ]
}

const normalizedByName = (fieldDefinitions: FieldDefinitions): Record<string, unknown> =>
  Object.fromEntries(Object.values(fieldDefinitions).map((def) => [def.name, def.normalizedBy]))

describe('reduce', () => {
  it('normalizes against the global registry when none is given', () => {
    const { fieldDefinitions } = reduce({ layout })

    expect(normalizedByName(fieldDefinitions)).toEqual({ root: undefined, title: 'global', image: undefined })
  })

  it('normalizes against the registry it is given', () => {
    // pimcore/platform-version#764: an editor with its own registry must resolve its own
    // types, including ones the global registry does not know and ones sharing a core id
    const editorRegistry = stubRegistry({ input: markAs('editor'), asset: markAs('editor') })

    const { fieldDefinitions } = reduce({ layout, registry: editorRegistry })

    expect(normalizedByName(fieldDefinitions)).toEqual({ root: undefined, title: 'editor', image: 'editor' })
  })
})
