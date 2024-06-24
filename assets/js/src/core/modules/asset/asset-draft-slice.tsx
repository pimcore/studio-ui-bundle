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

import { type PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { type Asset } from './asset-api-slice.gen'
import { type RootState, injectSliceWithState } from '@Pimcore/app/store'
import { type DataProperty } from './properties-api-slice.gen'

interface propertyAction {
  assetId: number
  property: DataProperty
}

export interface AssetDraft extends Asset {
  properties?: DataProperty[]
}

export const assetsAdapter = createEntityAdapter<AssetDraft>({})

export const slice = createSlice({
  name: 'asset-draft',
  initialState: assetsAdapter.getInitialState(),
  reducers: {
    assetReceived: assetsAdapter.upsertOne,

    addPropertyToAsset: (state, action: PayloadAction<propertyAction>) => {
      const asset = { ...assetsAdapter.getSelectors().selectById(state, action.payload.assetId) }

      if (asset !== undefined) {
        asset.properties = [...(asset.properties ?? []), action.payload.property]
      }

      state.entities[action.payload.assetId] = asset
    },

    removePropertyFromAsset: (state, action: PayloadAction<propertyAction>) => {
      const asset = { ...assetsAdapter.getSelectors().selectById(state, action.payload.assetId) }

      if (asset !== undefined) {
        asset.properties = (asset.properties ?? []).filter(property => property.key !== action
          .payload.property.key)
      }

      state.entities[action.payload.assetId] = asset
    },

    updatePropertyForAsset: (state, action: PayloadAction<propertyAction>) => {
      const asset = { ...assetsAdapter.getSelectors().selectById(state, action.payload.assetId) }

      console.log({ asset, action })

      if (asset !== undefined) {
        asset.properties = (asset.properties ?? []).map(property => {
          if (property.key === action.payload.property.key) {
            return action.payload.property
          }

          return property
        })
      }

      state.entities[action.payload.assetId] = asset
    },

    setPropertiesForAsset: (state, action: PayloadAction<{ assetId: number, properties: DataProperty[] }>) => {
      const asset = { ...assetsAdapter.getSelectors().selectById(state, action.payload.assetId) }

      if (asset !== undefined) {
        asset.properties = action.payload.properties
      }

      state.entities[action.payload.assetId] = asset
    }
  }
})

injectSliceWithState(slice)

export const { assetReceived, addPropertyToAsset, removePropertyFromAsset, setPropertiesForAsset, updatePropertyForAsset } = slice.actions
export const { selectById: selectAssetById } = assetsAdapter.getSelectors((state: RootState) => state['asset-draft'])
