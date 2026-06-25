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

interface SavedSearchDirtyState {
  /** Keyed by saved-search id — whether the opened search has unsaved changes (drives the tab "*"). */
  dirtyById: Record<number, boolean>
}

const initialState: SavedSearchDirtyState = { dirtyById: {} }

export const savedSearchDirtySlice = createSlice({
  name: 'saved-search-dirty',
  initialState,
  reducers: {
    setSavedSearchDirty (state, action: PayloadAction<{ id: number, dirty: boolean }>): void {
      state.dirtyById[action.payload.id] = action.payload.dirty
    },
    clearSavedSearchDirty (state, action: PayloadAction<number>): void {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete state.dirtyById[action.payload]
    }
  }
})

export const { setSavedSearchDirty, clearSavedSearchDirty } = savedSearchDirtySlice.actions

export const selectSavedSearchDirty = (state: RootState, id: number): boolean =>
  (state['saved-search-dirty'] as SavedSearchDirtyState | undefined)?.dirtyById?.[id] ?? false

injectSliceWithState(savedSearchDirtySlice)
