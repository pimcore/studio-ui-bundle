import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { type Asset } from './asset-api-slice.gen'
import { type RootState, injectSliceWithState } from '@Pimcore/app/store'

export interface AssetDraft extends Asset {
  id: number
}

export const assetsAdapter = createEntityAdapter<AssetDraft>({})

export const slice = createSlice({
  name: 'asset-draft',
  initialState: assetsAdapter.getInitialState(),
  reducers: {
    assetReceived: assetsAdapter.upsertOne
  }
})

injectSliceWithState(slice)

export const { assetReceived } = slice.actions
export const { selectById: selectAssetById } = assetsAdapter.getSelectors((state: RootState) => state['asset-draft'])
