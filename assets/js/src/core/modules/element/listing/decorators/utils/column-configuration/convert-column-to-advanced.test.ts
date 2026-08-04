/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { convertColumnToAdvanced, findColumnConversion } from './convert-column-to-advanced'
import { type AvailableColumn } from './context-layer/provider/available-columns/available-columns-provider'
import { DynamicTypePipelineGridSourceFieldsSimpleField } from '@Pimcore/modules/element/dynamic-types/definitions/pipelines/grid/source-fields/types/simple-field/simple-field'
import { DynamicTypePipelineGridSourceFieldsRelationField } from '@Pimcore/modules/element/dynamic-types/definitions/pipelines/grid/source-fields/types/relation-field/relation-field'
import { DynamicTypePipelineGridSourceFieldsText } from '@Pimcore/modules/element/dynamic-types/definitions/pipelines/grid/source-fields/types/text/text'

// The source field types only reference their components from getComponent(), which these tests
// never call. Mocking them keeps the test from transitively importing antd-style (untranspiled ESM).
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/pipelines/grid/source-fields/components/simple-field/simple-field', () => ({
  DynamicTypePipelineGridSourceFieldsSimpleFieldComponent: () => null
}))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/pipelines/grid/source-fields/components/relation-field/relation-field', () => ({
  DynamicTypePipelineGridSourceFieldsRelationFieldComponent: () => null
}))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/pipelines/grid/source-fields/components/text/text', () => ({
  DynamicTypePipelineGridSourceFieldsTextComponent: () => null
}))

const sourceFieldTypes = [
  new DynamicTypePipelineGridSourceFieldsText(),
  new DynamicTypePipelineGridSourceFieldsSimpleField(),
  new DynamicTypePipelineGridSourceFieldsRelationField()
]

const advancedColumnTemplate = {
  key: 'advanced',
  group: ['advanced'],
  sortable: false,
  editable: false,
  exportable: true,
  filterable: false,
  localizable: true,
  locale: null,
  type: 'dataobject.advanced',
  frontendType: 'input',
  config: {
    simpleField: [
      { name: 'Name', key: 'name' },
      { name: 'Attributes', key: 'attributes.CarAttributes.color' },
      { name: 'Store', key: 'store', config: { classificationStore: true, storeId: 1 } }
    ],
    relationField: [
      { name: 'Manufacturer', key: 'manufacturer', classIds: ['2'], fields: [{ name: 'Name', key: 'name' }, { name: 'Code', key: 'code' }] },
      { name: 'Dealer', key: 'dealer', classIds: ['3'], fields: [] },
      {
        name: 'Importer',
        key: 'importer',
        classIds: ['4'],
        fields: [
          { name: 'Store', key: 'store', config: { classificationStore: true, storeId: 1 } },
          { name: 'Name', key: 'name' }
        ]
      }
    ],
    transformers: []
  }
} as unknown as AvailableColumn

const column = (overrides: Partial<AvailableColumn> = {}): AvailableColumn => ({
  key: 'name',
  group: ['Car'],
  sortable: true,
  editable: true,
  exportable: true,
  filterable: true,
  localizable: false,
  locale: null,
  type: 'dataobject.adapter',
  frontendType: 'input',
  config: {},
  ...overrides
} as unknown as AvailableColumn)

const translate = (key: string): string => key

describe('findColumnConversion', () => {
  it('claims a column offered as a simple field', () => {
    expect(findColumnConversion(column(), advancedColumnTemplate, sourceFieldTypes)).toEqual({
      key: 'simpleField',
      config: { field: 'name' }
    })
  })

  it('claims object brick columns, which keep the same key format', () => {
    const brickColumn = column({ key: 'attributes.CarAttributes.color' })

    expect(findColumnConversion(brickColumn, advancedColumnTemplate, sourceFieldTypes)).toEqual({
      key: 'simpleField',
      config: { field: 'attributes.CarAttributes.color' }
    })
  })

  it('carries group and key of a classification store column over to the source field', () => {
    const classificationStoreColumn = column({
      key: 'store',
      type: 'dataobject.classificationstore',
      config: { groupId: 3, keyId: 7, fieldDefinition: { name: 'colorKey', title: 'Color' } }
    })

    expect(findColumnConversion(classificationStoreColumn, advancedColumnTemplate, sourceFieldTypes)).toEqual({
      key: 'simpleField',
      config: { field: 'store', groupId: 3, keyId: 7, keyName: 'Color' }
    })
  })

  it('claims a relation column, seeding both the relation and its first field', () => {
    expect(findColumnConversion(column({ key: 'manufacturer' }), advancedColumnTemplate, sourceFieldTypes)).toEqual({
      key: 'relationField',
      config: { relation: 'manufacturer', field: 'name' }
    })
  })

  it('skips classification store fields when seeding a relation, as their group/key cannot be inferred', () => {
    expect(findColumnConversion(column({ key: 'importer' }), advancedColumnTemplate, sourceFieldTypes)).toEqual({
      key: 'relationField',
      config: { relation: 'importer', field: 'name' }
    })
  })

  it('does not claim a relation whose allowed classes share no fields', () => {
    expect(findColumnConversion(column({ key: 'dealer' }), advancedColumnTemplate, sourceFieldTypes)).toBeUndefined()
  })

  it('does not claim columns that are not offered as a source field at all', () => {
    expect(findColumnConversion(column({ key: 'unknown' }), advancedColumnTemplate, sourceFieldTypes)).toBeUndefined()
  })

  it('does not claim an already advanced column', () => {
    expect(findColumnConversion(advancedColumnTemplate, advancedColumnTemplate, sourceFieldTypes)).toBeUndefined()
  })
})

describe('convertColumnToAdvanced', () => {
  const convert = (overrides: Partial<AvailableColumn> = {}, siblingColumns: AvailableColumn[] = []): AvailableColumn | undefined =>
    convertColumnToAdvanced({
      column: column(overrides),
      advancedColumnTemplate,
      sourceFieldTypes,
      siblingColumns,
      translate
    })

  it('returns the advanced column seeded with the original field', () => {
    const converted = convert()

    expect(converted?.key).toBe('advanced')
    expect(converted?.type).toBe('dataobject.advanced')
    expect(converted?.__meta?.advancedColumnConfig).toEqual({
      title: 'name',
      advancedColumns: [{ key: 'simpleField', config: { field: 'name' } }],
      transformers: []
    })
  })

  it('keeps locale and width', () => {
    const converted = convert({ localizable: true, locale: 'en', width: 240 })

    expect(converted?.locale).toBe('en')
    expect(converted?.width).toBe(240)
  })

  it('prefers the field definition title over the key for the title', () => {
    const converted = convert({ config: { fieldDefinition: { name: 'name', title: 'Product name' } } })

    expect(converted?.__meta?.advancedColumnConfig?.title).toBe('Product name')
  })

  it('leaves the unique id empty so the row remounts expanded', () => {
    expect(convert()?.__meta?.uniqueId).toBeUndefined()
  })

  it('keeps the title unique among siblings sharing the same locale', () => {
    const sibling = {
      ...advancedColumnTemplate,
      locale: null,
      __meta: { advancedColumnConfig: { title: 'name' } }
    } as unknown as AvailableColumn

    expect(convert({}, [sibling])?.__meta?.advancedColumnConfig?.title).toBe('name (2)')
  })

  it('allows the same title for a sibling with a different locale', () => {
    const sibling = {
      ...advancedColumnTemplate,
      locale: 'de',
      __meta: { advancedColumnConfig: { title: 'name' } }
    } as unknown as AvailableColumn

    expect(convert({}, [sibling])?.__meta?.advancedColumnConfig?.title).toBe('name')
  })

  it('seeds a relation column with its relation pipeline item', () => {
    expect(convert({ key: 'manufacturer' })?.__meta?.advancedColumnConfig?.advancedColumns).toEqual([
      { key: 'relationField', config: { relation: 'manufacturer', field: 'name' } }
    ])
  })

  it('returns undefined for a column that cannot be converted', () => {
    expect(convert({ key: 'unknown' })).toBeUndefined()
  })
})
