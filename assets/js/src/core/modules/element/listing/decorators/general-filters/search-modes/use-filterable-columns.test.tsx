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
import { Container } from 'inversify'
import { renderHook } from '@testing-library/react'
import { ContainerProvider } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type GridColumnConfiguration } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { type ColumnFilter } from '@Pimcore/modules/app/types/column-filter'
import { GeneralFiltersConfigProvider } from '../context-layer/provider/general-filters-config/general-filters-config-provider'
import { type GeneralFiltersDecoratorConfig } from '../general-filters-decorator'
import { FULLTEXT_SEARCH_MODE_ID, SearchModeAbstract, type SearchModeAvailability } from './search-mode-abstract'
import { SearchModeRegistry } from './search-mode-registry'
import { type AvailableColumn, AvailableColumnsContext, type AvailableColumnsData } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { useFilterableColumns } from './use-filterable-columns'

interface StoreMock { values: Record<string, unknown> }
let appliedStore: StoreMock | undefined
let draftStore: StoreMock | undefined

jest.mock('../element-filters/stores', () => ({
  useAppliedFiltersOptional: () => appliedStore,
  useDraftFiltersOptional: () => draftStore,
  useDraftFilters: () => draftStore
}))

const scoreColumn: GridColumnConfiguration = {
  key: 'score',
  group: ['system'],
  sortable: true,
  editable: false,
  localizable: false,
  locale: null,
  type: 'test.score',
  config: []
}

class ScoreMode extends SearchModeAbstract {
  readonly id = 'score'
  readonly columnFilterType = 'test.filter'
  readonly order = 10
  readonly icon = 'search'

  getMenuLabel (): string { return 'Score' }
  getCollapsedLabel (): string { return 'Score' }
  getAvailability (): SearchModeAvailability { return { available: true } }
  buildColumnFilter (query: string): ColumnFilter { return { type: this.columnFilterType, filterValue: query } }
  // fresh objects per call, like real modes
  getAdditionalColumns (): GridColumnConfiguration[] { return [{ ...scoreColumn }] }
}

const containerWithModes = (): Container => {
  const container = new Container()
  const registry = new SearchModeRegistry()
  registry.registerDynamicType(new ScoreMode())
  container.bind(serviceIds['Element/Listing/SearchModeRegistry']).toConstantValue(registry)
  return container
}

const idColumn: AvailableColumn = { ...scoreColumn, key: 'id', type: 'system.id' }
let availableColumns: AvailableColumn[]

const render = (source: 'draft' | 'applied', container: Container = containerWithModes()): ReturnType<typeof renderHook<AvailableColumn[], unknown>> =>
  renderHook(() => useFilterableColumns(source), {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <ContainerProvider container={ container }>
        <GeneralFiltersConfigProvider config={ { handleSearchTermInSidebar: true, elementType: 'asset' } }>
          <AvailableColumnsContext.Provider value={ { availableColumns } as unknown as AvailableColumnsData }>
            {children}
          </AvailableColumnsContext.Provider>
        </GeneralFiltersConfigProvider>
      </ContainerProvider>
    )
  })

describe('useFilterableColumns', () => {
  beforeEach(() => {
    availableColumns = [idColumn]
    appliedStore = { values: { searchMode: FULLTEXT_SEARCH_MODE_ID } }
    draftStore = { values: { searchMode: 'score' } }
  })

  it('adds the draft mode columns for the sidebar editor', () => {
    expect(render('draft').result.current.map((column) => column.key)).toEqual(['id', 'score'])
  })

  it('adds only the applied mode columns for the query', () => {
    expect(render('applied').result.current).toBe(availableColumns)

    appliedStore = { values: { searchMode: 'score' } }

    expect(render('applied').result.current.map((column) => column.key)).toEqual(['id', 'score'])
  })

  it('keeps the listing column on a key collision', () => {
    const apiScore = { ...scoreColumn, type: 'api.score' }
    availableColumns = [idColumn, apiScore]

    expect(render('draft').result.current).toEqual([idColumn, apiScore])
  })

  it('returns the available columns without a search mode registry', () => {
    expect(render('draft', new Container()).result.current).toBe(availableColumns)
  })

  it('keeps the same array reference across renders', () => {
    const { result, rerender } = render('draft')
    const first = result.current

    rerender()

    expect(result.current).toBe(first)
  })
})
