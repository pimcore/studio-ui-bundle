/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectSliceWithState } from '@Pimcore/app/store'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface AssetDraftErrorState {
  failedDraftIds: number[]
}

const initialState: AssetDraftErrorState = {
  failedDraftIds: []
}

const assetErrorSlice = createSlice({
  name: 'asset-draft-error',
  initialState,
  reducers: {
    addFailedDraftId: (state, action: PayloadAction<number>) => {
      if (!state.failedDraftIds.includes(action.payload)) {
        state.failedDraftIds.push(action.payload)
      }
    },
    removeFailedDraftId: (state, action: PayloadAction<number>) => {
      state.failedDraftIds = state.failedDraftIds.filter(id => id !== action.payload)
    }
  }
})

export const { addFailedDraftId, removeFailedDraftId } = assetErrorSlice.actions

export const isFailedDraftId = (state: any, id: number): boolean => {
  return state['asset-draft-error'].failedDraftIds.includes(id)
}

export default assetErrorSlice.reducer

injectSliceWithState(assetErrorSlice)
