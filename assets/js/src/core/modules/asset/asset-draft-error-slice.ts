/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
