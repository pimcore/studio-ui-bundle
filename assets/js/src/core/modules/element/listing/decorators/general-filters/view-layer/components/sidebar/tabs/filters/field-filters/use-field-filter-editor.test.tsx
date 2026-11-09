/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { act, renderHook } from '@testing-library/react'
import { type ColumnPickerGroup } from '@Pimcore/components/column-picker/column-picker.types'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { type FieldFilter } from '../../../../../../context-layer/provider/field-filters/field-filters-provider'
import { useFieldFilterEditor } from './use-field-filter-editor'

let filterableColumns: AvailableColumn[] = []
const filterableSources: string[] = []
let draftFieldFilters: FieldFilter[] = []
let onUpdateClassificationStoreColumn: (data: unknown) => void = () => {}

// The key types that report no grid filter: the six offered before the picker was widened, and the new ones.
const NO_FILTER_TYPES = ['image', 'encryptedField', 'table', 'calculatedValue', 'quantityValueRange', 'password']
const FILTERABLE_TYPE = 'input'
const STORE_COLUMN_KEY = 'cs'

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
// only the instanceof check is used; the fake resolver returns a wrapper type
jest.mock('@sdk/modules/element', () => ({ DynamicTypeFieldFilterAbstract: function DynamicTypeFieldFilterAbstract () {} }))
jest.mock('@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver', () => ({
  useDynamicTypeResolver: () => ({
    getType: ({ dynamicTypeIds }: { dynamicTypeIds: string[] }) => ({
      dynamicTypeFieldFilterType: { isFilterAvailable: () => !NO_FILTER_TYPES.includes(dynamicTypeIds[0]) }
    })
  })
}))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider/classifcation-store-modal-provider', () => ({
  useClassificationStoreModal: ({ onUpdate }: { onUpdate: (data: unknown) => void }) => {
    onUpdateClassificationStoreColumn = onUpdate
    return { openModal: jest.fn() }
  }
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

  describe('applying keys from the group by key picker', () => {
    const storeColumn: AvailableColumn = { ...column(STORE_COLUMN_KEY), type: 'dataobject.classificationstore', frontendType: 'classificationstore' }

    const appliedItem = (fieldtype: string, id: number): object => ({
      id,
      groupId: 1,
      definition: { fieldtype, title: `key ${id}` }
    })

    it('adds a filter row only for keys whose type reports a grid filter', () => {
      draftFieldFilters = []
      filterableColumns = [storeColumn]
      const { result } = renderHook(() => useFieldFilterEditor({ onCommit: jest.fn() }))

      act(() => {
        onUpdateClassificationStoreColumn({
          modalContext: { fieldName: STORE_COLUMN_KEY },
          data: [...NO_FILTER_TYPES.map((type, index) => appliedItem(type, index)), appliedItem(FILTERABLE_TYPE, 100)]
        })
      })

      expect(result.current.filters.map((filter) => filter.config.keyId)).toEqual([100])
    })

    it('keeps a saved filter on a key of a type without a grid filter and sends it as it is', () => {
      const savedFilter: FieldFilter = {
        key: STORE_COLUMN_KEY,
        type: 'dataobject.classificationstore',
        filterValue: 'saved',
        locale: undefined,
        meta: { translationKey: 'key 1', keyId: 1, groupId: 1, fieldDefinition: { fieldtype: 'password' } }
      }
      draftFieldFilters = [savedFilter]
      filterableColumns = [storeColumn]
      const onCommit = jest.fn()
      const { result } = renderHook(() => useFieldFilterEditor({ onCommit }))

      expect(result.current.filters.map((filter) => filter.id)).toEqual([STORE_COLUMN_KEY])

      act(() => { result.current.onFilterCommit(result.current.filters) })

      expect(onCommit).toHaveBeenCalledWith([savedFilter])
    })
  })
})
