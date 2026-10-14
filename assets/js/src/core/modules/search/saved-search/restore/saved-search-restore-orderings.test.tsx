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
import { act, render } from '@testing-library/react'
import { withColumnConfiguration as withAssetColumns } from '@Pimcore/modules/search/modal/tabs/asset/listing/decorator/static-column-configuration/config-layer/with-column-configuration'
import { withColumnConfiguration as withDocumentColumns } from '@Pimcore/modules/search/modal/tabs/document/listing/decorator/static-column-configuration/config-layer/with-column-configuration'
import { staticAvailableColumns as assetColumns } from '@Pimcore/modules/search/modal/tabs/asset/listing/decorator/static-column-configuration/config-layer/static-available-columns'
import { staticAvailableColumns as documentColumns } from '@Pimcore/modules/search/modal/tabs/document/listing/decorator/static-column-configuration/config-layer/static-available-columns'
import { SavedSearchRestore } from './saved-search-restore'
import { buildSelectedColumns, restoredColumnLayout } from './restored-layout'

/*
 * The asset and document restore against the real static column configuration it is mounted
 * under: the search handed in before or after the listing mounts, and handed back once consumed.
 */

interface Column { key: string, locale?: string | null, width?: number | null }
interface World { pending?: Record<string, unknown>, available: Column[], selected: Column[], applies: number }

let world: World
let changed = false
const set = (patch: Partial<World>): void => { world = { ...world, ...patch }; changed = true }

jest.mock('@Pimcore/modules/search/provider/use-search', () => ({
  useSearch: () => ({ pendingRestore: world.pending, setPendingRestore: (pending?: Record<string, unknown>) => { set({ pending }) } })
}))
jest.mock('@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns', () => ({
  useAvailableColumns: () => ({ availableColumns: world.available, setAvailableColumns: (available: Column[]) => { set({ available }) } })
}))
jest.mock('@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns', () => ({
  useSelectedColumns: () => ({ selectedColumns: world.selected, setSelectedColumns: (selected: Column[]) => { set({ selected }) } })
}))
jest.mock('@Pimcore/modules/element/listing/abstract/settings/use-settings', () => ({
  useSettings: () => ({ useDataQueryHelper: () => ({ setDataLoadingState: () => {} }) })
}))
// the apply as the real one writes the columns: the saved layout, once there is a column set to map it on
jest.mock('./use-apply-saved-search', () => ({
  useApplySavedSearch: () => (configuration: { columns?: Column[] }) => {
    set({ applies: world.applies + 1 })
    const saved = configuration.columns ?? []
    if (saved.length > 0 && world.available.length > 0) {
      const selected = buildSelectedColumns(saved as never[], world.available as never[]) as Column[]
      if (selected.length > 0) set({ selected })
    }
  }
}))

const layout = (columns: Column[]): unknown => columns.map((c) => ({ key: c.key, locale: c.locale ?? null, width: c.width ?? null }))

const TABS = {
  asset: { withColumns: withAssetColumns, available: assetColumns as Column[] },
  document: { withColumns: withDocumentColumns, available: documentColumns as Column[] }
}

describe('asset and document saved-search restore — handed in before or after the listing mounts', () => {
  for (const [elementType, { withColumns, available }] of Object.entries(TABS)) {
    const Restore = (): React.JSX.Element => <SavedSearchRestore elementType={ elementType as 'asset' | 'document' } />
    const Listing = withColumns(Restore)
    const SEARCHES: Record<string, Record<string, unknown>> = {
      'saved columns': { elementType, columns: [{ key: 'fullpath', width: 400 }, { key: 'id', width: 90 }], filter: [{ columnFilters: [] }] },
      'no columns': { elementType, columns: [], filter: [{ columnFilters: [] }] },
      'columns this tab lacks': { elementType, columns: [{ key: 'goneFromTheTab' }], filter: [{ columnFilters: [] }] }
    }

    for (const [name, search] of Object.entries(SEARCHES)) {
      for (const handedIn of ['before mounting', 'after mounting'] as const) {
        it(`${elementType}, ${name}, ${handedIn}: applied once and consumed, and again when handed back`, () => {
          world = { pending: handedIn === 'before mounting' ? search : undefined, available: [], selected: [], applies: 0 }
          const { rerender } = render(<Listing />)
          const settle = (): void => {
            for (let pass = 0; pass < 30; pass++) {
              changed = false
              act(() => { rerender(<Listing />) })
              if (!changed) return
            }
            throw new Error('the listing never settles')
          }
          settle()
          if (handedIn === 'after mounting') { set({ pending: search }); settle() }

          expect(world.pending).toBeUndefined()
          expect(world.applies).toBe(1)
          const expected = restoredColumnLayout((search.columns ?? []) as never[], available as never[]) as Column[]
          if (expected.length > 0) expect(layout(world.selected)).toEqual(layout(expected))

          // the same configuration object handed back later is applied again, once
          set({ pending: search }); settle()
          expect(world.pending).toBeUndefined()
          expect(world.applies).toBe(2)
        })
      }
    }
  }
})
