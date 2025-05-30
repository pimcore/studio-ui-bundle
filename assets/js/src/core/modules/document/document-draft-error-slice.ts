/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectSliceWithState } from '@sdk/app'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface DocumentDraftErrorState {
  failedDraftIds: number[]
}

const initialState: DocumentDraftErrorState = {
  failedDraftIds: []
}

const dataObjectErrorSlice = createSlice({
  name: 'document-draft-error',
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

export const { addFailedDraftId, removeFailedDraftId } = dataObjectErrorSlice.actions

export const isFailedDraftId = (state: any, id: number): boolean => {
  return state['document-draft-error'].failedDraftIds.includes(id)
}

export default dataObjectErrorSlice.reducer

injectSliceWithState(dataObjectErrorSlice)
