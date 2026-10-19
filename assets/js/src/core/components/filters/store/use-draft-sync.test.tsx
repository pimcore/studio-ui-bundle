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
import { act, renderHook } from '@testing-library/react'
import { createFiltersStore, type FiltersStore } from './create-filters-store'
import { useDraftSync } from './use-draft-sync'

const descriptors = [
  { key: 'searchTerm', defaultValue: '' },
  { key: 'directChildren', defaultValue: false },
  { key: 'fieldFilters', defaultValue: [] }
]

const renderSyncedStores = (appliedInitial = {}): { current: { applied: FiltersStore, draft: FiltersStore } } => {
  const appliedStore = createFiltersStore()
  const draftStore = createFiltersStore()

  const wrapper = ({ children }: { children: React.ReactNode }): React.JSX.Element => (
    <appliedStore.FiltersStoreProvider
      descriptors={ descriptors }
      initialValues={ appliedInitial }
    >
      <draftStore.FiltersStoreProvider
        descriptors={ descriptors }
        initialValues={ appliedInitial }
      >
        {children}
      </draftStore.FiltersStoreProvider>
    </appliedStore.FiltersStoreProvider>
  )

  const { result } = renderHook(() => {
    const applied = appliedStore.useFiltersStore()
    const draft = draftStore.useFiltersStore()

    useDraftSync(applied.values, draft)

    return { applied, draft }
  }, { wrapper })

  return result
}

describe('useDraftSync', () => {
  it('mirrors a changed applied value into the draft', () => {
    const stores = renderSyncedStores()

    act(() => { stores.current.applied.setValue('searchTerm', 'jaguar') })

    expect(stores.current.draft.values.searchTerm).toBe('jaguar')
  })

  it('keeps unapplied draft edits when an unrelated applied value changes', () => {
    const stores = renderSyncedStores()
    const unappliedFilters = [{ key: 'name', filterValue: 'typed but not applied' }]

    act(() => { stores.current.draft.setValue('fieldFilters', unappliedFilters) })
    act(() => { stores.current.applied.setValue('searchTerm', 'jaguar') })

    expect(stores.current.draft.values.searchTerm).toBe('jaguar')
    expect(stores.current.draft.values.fieldFilters).toBe(unappliedFilters)
  })

  it('overwrites a draft edit when that very value changes in the applied store', () => {
    const stores = renderSyncedStores()
    const restoredFilters = [{ key: 'name', filterValue: 'restored' }]

    act(() => { stores.current.draft.setValue('fieldFilters', [{ key: 'name', filterValue: 'typed' }]) })
    act(() => { stores.current.applied.setValue('fieldFilters', restoredFilters) })

    expect(stores.current.draft.values.fieldFilters).toBe(restoredFilters)
  })

  it('leaves the draft untouched when the whole draft is published', () => {
    const stores = renderSyncedStores()
    const filters = [{ key: 'name', filterValue: 'applied' }]

    act(() => { stores.current.draft.setValues({ fieldFilters: filters, directChildren: true }) })
    act(() => { stores.current.applied.setValues(stores.current.draft.values) })

    expect(stores.current.draft.values.fieldFilters).toBe(filters)
    expect(stores.current.draft.values.directChildren).toBe(true)
  })

  it('mirrors every key of a neutral state published whole', () => {
    const stores = renderSyncedStores({ searchTerm: 'foo', directChildren: true, fieldFilters: [{ key: 'name', filterValue: 'x' }] })

    act(() => { stores.current.applied.setValues({ searchTerm: '', directChildren: false, fieldFilters: [] }) })

    expect(stores.current.draft.values).toEqual({ searchTerm: '', directChildren: false, fieldFilters: [] })
  })
})
