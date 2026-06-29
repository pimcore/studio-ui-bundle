/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type RootState, injectSliceWithState } from '@Pimcore/app/store'

/** The two independent sources of "unsaved changes" for an opened saved search. */
export type SavedSearchDirtySource = 'grid' | 'meta'

interface SavedSearchDirtyEntry {
  /** Live grid state (columns/width + filters) differs from the persisted search. */
  grid?: boolean
  /** Panel metadata (name/description/shortcut/sharing) differs from the persisted search. */
  meta?: boolean
}

interface SavedSearchDirtyState {
  /**
   * Keyed by saved-search id — whether the opened search has unsaved changes (drives the tab "*").
   * Split by source so the grid tracker and the save panel can report independently; the tab shows
   * "*" when either is dirty.
   */
  dirtyById: Record<number, SavedSearchDirtyEntry>
}

const initialState: SavedSearchDirtyState = { dirtyById: {} }

export const savedSearchDirtySlice = createSlice({
  name: 'saved-search-dirty',
  initialState,
  reducers: {
    setSavedSearchDirty (
      state,
      action: PayloadAction<{ id: number, source: SavedSearchDirtySource, dirty: boolean }>
    ): void {
      const { id, source, dirty } = action.payload
      state.dirtyById[id] = { ...state.dirtyById[id], [source]: dirty }
    },
    clearSavedSearchDirty (state, action: PayloadAction<number>): void {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete state.dirtyById[action.payload]
    }
  }
})

export const { setSavedSearchDirty, clearSavedSearchDirty } = savedSearchDirtySlice.actions

export const selectSavedSearchDirty = (state: RootState, id: number): boolean => {
  const entry = (state['saved-search-dirty'] as SavedSearchDirtyState | undefined)?.dirtyById?.[id]
  return (entry?.grid ?? false) || (entry?.meta ?? false)
}

injectSliceWithState(savedSearchDirtySlice)
