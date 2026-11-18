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
import { render } from '@testing-library/react'
import { VISIBLE_FIELDS_ELEMENT_TYPE } from '@Pimcore/components/many-to-many-relation/utils/visible-fields-key'
import { ManyToManyRelationWithVisibleFields } from './many-to-many-relation-with-visible-fields'
import { RELATION_VISIBLE_FIELD_VALUES } from './hooks/use-relation-visible-fields'

const mockManyToManyRelation = jest.fn((props: any) => null)
const mockColumnsQuery = jest.fn()
const mockValues = jest.fn()
const mockSelectedColumns = jest.fn()

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, unknown>) => options === undefined ? key : `${key} ${JSON.stringify(options)}`
  })
}))

jest.mock('@Pimcore/components/language-selection', () => ({
  useLanguageSelection: () => ({ currentLanguage: 'de' })
}))

jest.mock('@Pimcore/components/many-to-many-relation', () => ({
  ManyToManyRelation: (props: any) => mockManyToManyRelation(props)
}))

jest.mock('@Pimcore/components/many-to-many-relation/utils/helpers', () => ({
  getElementCellConfig: (disabled: boolean) => ({ disabled })
}))

jest.mock('@Pimcore/components/many-to-many-relation/utils/full-path-cell-renderer', () => ({
  renderFullPathCell: () => null
}))

jest.mock('@Pimcore/components/text/text', () => ({
  Text: ({ children }: { children: React.ReactNode }) => children
}))

jest.mock('@Pimcore/modules/element/dynamic-types/registry/provider/dynamic-type-registry-provider', () => ({
  DynamicTypeRegistryProvider: ({ children }: { children: React.ReactNode }) => children
}))

jest.mock('@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider', () => ({
  SelectedColumnsProvider: ({ children, columns }: { children: React.ReactNode, columns: unknown }) => {
    mockSelectedColumns(columns)
    return children
  }
}))

jest.mock('@Pimcore/modules/element/hooks/use-element-context', () => ({
  useElementContext: () => ({ id: 1, elementType: 'data-object' })
}))

jest.mock('@Pimcore/modules/data-object/hooks/use-data-object-draft', () => ({
  useDataObjectDraft: () => ({ dataObject: { className: 'Car' } })
}))

jest.mock('@Pimcore/modules/data-object/utils/provider/class-defintions/use-class-definitions', () => ({
  useClassDefinitions: () => ({ getByName: () => ({ id: 'car-class-id' }) })
}))

jest.mock('@Pimcore/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection', () => ({
  useClassDefinitionSelectionOptional: () => null
}))

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-object-relation/hooks/use-grid-options', () => ({
  useGridOptions: () => ({
    transformGridColumn: (column: any) => ({ header: column.title === '' ? column.key : column.title, meta: { type: column.type, editable: false } })
  })
}))

jest.mock('@Pimcore/modules/data-object/data-object-api-slice.gen', () => ({
  useDataObjectGetAvailableGridColumnsForRelationQuery: (args: unknown, options: unknown) => mockColumnsQuery(args, options)
}))

jest.mock('./hooks/use-relation-visible-field-values', () => ({
  useRelationVisibleFieldValues: (props: unknown) => mockValues(props)
}))

const column = (key: string, type: string, localizable: boolean = false): any => ({
  key, type, frontendType: 'input', localizable, locale: null, group: ['test'], config: [], sortable: false, editable: false, exportable: false, filterable: false
})

const baseProps: any = {
  combinedFieldName: 'related',
  allowToClearRelation: true,
  maxItems: null,
  pathFormatterClass: null,
  width: null,
  height: null,
  value: [
    { id: 7, type: 'asset', subtype: 'image', fullPath: '/chair.jpg', isPublished: null },
    { id: 7, type: 'object', subtype: 'Product', fullPath: '/products/chair', isPublished: true }
  ]
}

const lastRelationProps = (): any => mockManyToManyRelation.mock.calls[mockManyToManyRelation.mock.calls.length - 1][0]

describe('ManyToManyRelationWithVisibleFields', () => {
  beforeEach(() => {
    mockManyToManyRelation.mockClear()
    mockColumnsQuery.mockReset()
    mockValues.mockReset()
    mockSelectedColumns.mockClear()
    mockValues.mockReturnValue({ valuesByElement: new Map(), isLoading: false, isError: false, loadedCount: 0, totalCount: 0, refetchAll: jest.fn() })
  })

  it('is the plain relation grid without visible fields', () => {
    render(<ManyToManyRelationWithVisibleFields
      { ...baseProps }
      visibleFields=""
           />)

    expect(lastRelationProps()).toEqual(baseProps)
    expect(mockColumnsQuery).not.toHaveBeenCalled()
    expect(mockValues).not.toHaveBeenCalled()
  })

  it('adds a read-only column per visible field between the reference and the type', () => {
    mockColumnsQuery.mockReturnValue({
      isLoading: false,
      data: { columns: { filename: column('filename', 'system.string'), title: column('title', 'dataobject.adapter', true) } }
    })
    mockValues.mockReturnValue({
      valuesByElement: new Map([
        ['asset:7', [{ key: 'filename', locale: null, value: 'chair.jpg' }, { key: 'title', locale: 'de', value: null }]],
        ['object:7', [{ key: 'filename', locale: null, value: null }, { key: 'title', locale: 'de', value: 'Stuhl' }]]
      ]),
      isLoading: false,
      isError: false,
      loadedCount: 2,
      totalCount: 2,
      refetchAll: jest.fn()
    })

    render(<ManyToManyRelationWithVisibleFields
      { ...baseProps }
      visibleFieldDefinitions={ { filename: { title: 'File name' }, title: { title: 'Title' } } }
      visibleFields="filename,title"
           />)

    expect(mockColumnsQuery).toHaveBeenCalledWith({ classId: 'car-class-id', relationField: 'related' }, { skip: false })
    expect(mockValues).toHaveBeenLastCalledWith(expect.objectContaining({ enabled: true, classId: 'car-class-id', relationField: 'related', locale: 'de' }))

    const props = lastRelationProps()
    const columnIds = props.columnDefinition.map((def: any) => def.id ?? def.accessorKey)
    expect(columnIds).toEqual([
      'id',
      'fullPath',
      JSON.stringify({ key: 'filename', locale: null }),
      JSON.stringify({ key: 'title', locale: 'de' }),
      'type',
      'subtype'
    ])
    expect(props.columnDefinition[2].header).toBe('File name')

    // the values come from the visible field values of the row, never from a row property of the same name
    const assetRow = props.enrichRowData({ ...baseProps.value[0], filename: 'metadata column value' })
    expect(props.columnDefinition[2].accessorFn(assetRow)).toBe('chair.jpg')
    expect(assetRow.filename).toBe('metadata column value')
    expect(assetRow['__api-data'].columns).toHaveLength(2)

    const objectRow = props.enrichRowData(baseProps.value[1])
    expect(objectRow[RELATION_VISIBLE_FIELD_VALUES]).toEqual({ filename: null, title: 'Stuhl' })

    // asset 7 and object 7 keep their own entries for the search and the column filters
    expect(props.visibleFieldsValue).toEqual([
      { filename: 'chair.jpg', title: null, id: 7, [VISIBLE_FIELDS_ELEMENT_TYPE]: 'asset' },
      { filename: null, title: 'Stuhl', id: 7, [VISIBLE_FIELDS_ELEMENT_TYPE]: 'object' }
    ])

    expect(mockSelectedColumns).toHaveBeenLastCalledWith([
      expect.objectContaining({ key: 'filename', locale: null, editable: false }),
      expect.objectContaining({ key: 'title', locale: 'de', localizable: true })
    ])
  })

  it('tells while the values are loading', () => {
    mockColumnsQuery.mockReturnValue({ isLoading: false, data: { columns: [column('filename', 'system.string')] } })
    mockValues.mockReturnValue({ valuesByElement: new Map(), isLoading: true, isError: false, loadedCount: 0, totalCount: 2, refetchAll: jest.fn() })

    render(<ManyToManyRelationWithVisibleFields
      { ...baseProps }
      visibleFields="filename"
           />)

    const { container } = render(<>{ lastRelationProps().hint }</>)
    expect(container.textContent).toBe('relations.visible-fields.loading')
  })
})
