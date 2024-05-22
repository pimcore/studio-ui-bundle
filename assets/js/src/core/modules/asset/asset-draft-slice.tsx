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
