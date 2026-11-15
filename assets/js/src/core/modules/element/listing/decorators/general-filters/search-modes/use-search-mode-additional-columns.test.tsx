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
import { useSearchModeAdditionalColumns, useSearchModeColumns } from './use-search-mode-additional-columns'

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

const render = (container: Container, config: GeneralFiltersDecoratorConfig = { handleSearchTermInSidebar: true, elementType: 'asset' }): ReturnType<typeof renderHook<ReturnType<typeof useSearchModeAdditionalColumns>, unknown>> =>
  renderHook(() => useSearchModeAdditionalColumns(() => undefined), {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <ContainerProvider container={ container }>
        <GeneralFiltersConfigProvider config={ config }>{children}</GeneralFiltersConfigProvider>
      </ContainerProvider>
    )
  })

describe('useSearchModeAdditionalColumns', () => {
  beforeEach(() => {
    appliedStore = { values: { searchMode: 'score' } }
    draftStore = { values: { searchMode: FULLTEXT_SEARCH_MODE_ID } }
  })

  it('returns the applied mode columns as selected columns', () => {
    const { result } = render(containerWithModes())

    expect(result.current.map((column) => column.key)).toEqual(['score'])
  })

  it('follows the applied store, not the sidebar draft', () => {
    appliedStore = { values: { searchMode: FULLTEXT_SEARCH_MODE_ID } }
    draftStore = { values: { searchMode: 'score' } }

    expect(render(containerWithModes()).result.current).toEqual([])
  })

  it('reads the draft store when asked to (sidebar editor)', () => {
    appliedStore = { values: { searchMode: FULLTEXT_SEARCH_MODE_ID } }
    draftStore = { values: { searchMode: 'score' } }

    const { result } = renderHook(() => useSearchModeColumns('draft', () => undefined), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <ContainerProvider container={ containerWithModes() }>
          <GeneralFiltersConfigProvider config={ { handleSearchTermInSidebar: true, elementType: 'asset' } }>{children}</GeneralFiltersConfigProvider>
        </ContainerProvider>
      )
    })

    expect(result.current).toEqual([scoreColumn])
  })

  it('returns nothing without a search mode registry', () => {
    expect(render(new Container()).result.current).toEqual([])
  })

  it('returns nothing without an applied filter store', () => {
    appliedStore = undefined

    expect(render(containerWithModes()).result.current).toEqual([])
  })

  it('returns nothing on listings without search modes (no element type)', () => {
    expect(render(containerWithModes(), { handleSearchTermInSidebar: true }).result.current).toEqual([])
  })

  it('keeps the same array reference while the columns are equal', () => {
    const { result, rerender } = render(containerWithModes())
    const first = result.current

    rerender()

    expect(result.current).toBe(first)
  })
})
