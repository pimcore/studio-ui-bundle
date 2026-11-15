/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { renderHook } from '@testing-library/react'
import { type ColumnPickerGroup } from '@Pimcore/components/column-picker/column-picker.types'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { type FieldFilter } from '../../../../../../context-layer/provider/field-filters/field-filters-provider'
import { useFieldFilterEditor } from './use-field-filter-editor'

let filterableColumns: AvailableColumn[] = []
const filterableSources: string[] = []
let draftFieldFilters: FieldFilter[] = []

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
// only the instanceof check is used; the fake resolver returns a wrapper type
jest.mock('@sdk/modules/element', () => ({ DynamicTypeFieldFilterAbstract: function DynamicTypeFieldFilterAbstract () {} }))
jest.mock('@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver', () => ({
  useDynamicTypeResolver: () => ({ getType: () => ({ dynamicTypeFieldFilterType: { isFilterAvailable: () => true } }) })
}))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider/classifcation-store-modal-provider', () => ({
  useClassificationStoreModal: () => ({ openModal: jest.fn() })
}))
jest.mock('@Pimcore/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection', () => ({
  useClassDefinitionSelectionOptional: () => undefined
}))
jest.mock('../../../../../../element-filters', () => ({
  useDraftFilterValues: () => ({ fieldFilters: draftFieldFilters, setFieldFilters: jest.fn() })
}))
jest.mock('../../../../../../search-modes/use-filterable-columns', () => ({
  useFilterableColumns: (source: string) => {
    filterableSources.push(source)
    return filterableColumns
  }
}))

const column = (key: string): AvailableColumn => ({
  key,
  group: ['system'],
  sortable: true,
  editable: false,
  localizable: false,
  locale: null,
  type: `test.${key}`,
  frontendType: `test.${key}`,
  config: []
})

const collectKeys = (group: ColumnPickerGroup<AvailableColumn>): string[] => [
  ...group.items.map((item) => item.meta?.key ?? ''),
  ...(group.children ?? []).flatMap(collectKeys)
]

const pickerKeys = (result: ReturnType<typeof useFieldFilterEditor>): string[] => result.columnGroups.flatMap(collectKeys)

describe('useFieldFilterEditor', () => {
  beforeEach(() => {
    filterableSources.length = 0
    draftFieldFilters = [{ key: 'score', type: 'test.score', filterValue: 0.8, locale: undefined, meta: { translationKey: 'score' } }]
  })

  it('reads the filterable columns of the draft search mode', () => {
    filterableColumns = [column('id')]
    renderHook(() => useFieldFilterEditor({ onCommit: jest.fn() }))

    expect(filterableSources).toContain('draft')
    expect(filterableSources).not.toContain('applied')
  })

  it('keeps an existing filter on a search mode column and offers the remaining columns', () => {
    filterableColumns = [column('id'), column('score')]
    const { result } = renderHook(() => useFieldFilterEditor({ onCommit: jest.fn() }))

    expect(result.current.filters.map((filter) => filter.id)).toEqual(['score'])
    expect(pickerKeys(result.current)).toEqual(['id'])
  })

  it('offers a search mode column in the add list', () => {
    draftFieldFilters = []
    filterableColumns = [column('id'), column('score')]
    const { result } = renderHook(() => useFieldFilterEditor({ onCommit: jest.fn() }))

    expect(pickerKeys(result.current).sort()).toEqual(['id', 'score'])
  })

  it('drops the filter once the mode column is gone', () => {
    filterableColumns = [column('id')]
    const { result } = renderHook(() => useFieldFilterEditor({ onCommit: jest.fn() }))

    expect(result.current.filters).toEqual([])
  })
})
