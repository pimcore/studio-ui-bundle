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
import { type SavedSearchDetailedConfiguration } from '@Pimcore/modules/search/search-api-slice.gen'
import { useApplySavedSearch } from './use-apply-saved-search'

const setAppliedFilters = jest.fn()
const setPage = jest.fn()
const setPageSize = jest.fn()
const setSelectedColumns = jest.fn()
const setTags = jest.fn()
const setDataLoadingState = jest.fn()
const setType = jest.fn()

jest.mock('@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data', () => ({
  useData: () => ({ setDataLoadingState })
}))

jest.mock('@Pimcore/modules/element/listing/decorators/paging/context-layer/paging/provider/use-paging', () => ({
  usePaging: () => ({ setPage, setPageSize })
}))

jest.mock('@Pimcore/modules/element/listing/decorators/general-filters/element-filters', () => ({
  useAppliedFilters: () => ({ setValues: setAppliedFilters })
}))

jest.mock('@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns', () => ({
  useSelectedColumns: () => ({ setSelectedColumns })
}))

jest.mock('@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns', () => ({
  useAvailableColumns: () => ({ availableColumns: [] })
}))

jest.mock('@Pimcore/modules/asset/listing/decorator/tag-filter/context-layer/provider/tag-filter/use-tag-filter', () => ({
  useTagFilter: () => ({ setTags })
}))

jest.mock('@Pimcore/modules/element/components/type-select/provider/use-type-select', () => ({
  useTypeSelect: () => ({ setValue: setType })
}))

const buildConfiguration = (columnFilters: unknown[]): SavedSearchDetailedConfiguration =>
  ({ filter: [{ columnFilters }] } as unknown as SavedSearchDetailedConfiguration)

describe('useApplySavedSearch', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('restores the type select from the saved `type` column filter', () => {
    const configuration = buildConfiguration([
      { key: 'type', filterValue: 'object', type: 'system.string' },
      { key: 'name', filterValue: 'E-Type', type: 'system.string' }
    ])

    const { result } = renderHook(() => useApplySavedSearch())
    result.current(configuration)

    expect(setType).toHaveBeenCalledWith('object')
  })

  it('excludes the `type` column filter from the restored field filters', () => {
    const configuration = buildConfiguration([
      { key: 'type', filterValue: 'object', type: 'system.string' },
      { key: 'name', filterValue: 'E-Type', type: 'system.string' }
    ])

    const { result } = renderHook(() => useApplySavedSearch())
    result.current(configuration)

    expect(setAppliedFilters).toHaveBeenCalledWith(expect.objectContaining({
      fieldFilters: [expect.objectContaining({ key: 'name', filterValue: 'E-Type' })]
    }))
  })

  it('resets the type select to null when no type filter was saved, so a previous search does not leak in', () => {
    const configuration = buildConfiguration([])

    const { result } = renderHook(() => useApplySavedSearch())
    result.current(configuration)

    expect(setType).toHaveBeenCalledWith(null)
  })
})
