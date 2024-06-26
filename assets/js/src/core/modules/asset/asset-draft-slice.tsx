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
  properties: DataProperty[]
  modified: boolean
  changes: Record<string, any>
}

export const assetsAdapter = createEntityAdapter<AssetDraft>({})

export const slice = createSlice({
  name: 'asset-draft',
  initialState: assetsAdapter.getInitialState({ modified: false, properties: [], changes: {} }),
  reducers: {
    assetReceived: assetsAdapter.upsertOne,

    addPropertyToAsset: (state, action: PayloadAction<propertyAction>) => {
      const asset = { ...assetsAdapter.getSelectors().selectById(state, action.payload.assetId) }

      if (asset !== undefined) {
        asset.properties = [...(asset.properties ?? []), action.payload.property]

        asset.modified = true

        asset.changes = {
          ...asset.changes,
          properties: true
        }
      }

      state.entities[action.payload.assetId] = asset
    },

    removePropertyFromAsset: (state, action: PayloadAction<propertyAction>) => {
      const asset = { ...assetsAdapter.getSelectors().selectById(state, action.payload.assetId) }

      if (asset !== undefined) {
        asset.properties = (asset.properties ?? []).filter(property => property.key !== action
          .payload.property.key)

        asset.modified = true

        asset.changes = {
          ...asset.changes,
          properties: true
        }
      }

      state.entities[action.payload.assetId] = asset
    },

    updatePropertyForAsset: (state, action: PayloadAction<propertyAction>) => {
      const asset = { ...assetsAdapter.getSelectors().selectById(state, action.payload.assetId) }

      if (asset !== undefined) {
        asset.properties = (asset.properties ?? []).map(property => {
          if (property.key === action.payload.property.key) {
            asset.modified = true

            asset.changes = {
              ...asset.changes,
              properties: true
            }

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
    },

    setChanges (state, action: PayloadAction<{ assetId: number, changes: Record<string, any> }>): void {
      const asset = { ...assetsAdapter.getSelectors().selectById(state, action.payload.assetId) }

      if (asset !== undefined) {
        asset.changes = action.payload.changes
      }

      state.entities[action.payload.assetId] = asset
    },

    resetChanges (state, action: PayloadAction<number>): void {
      const asset = { ...assetsAdapter.getSelectors().selectById(state, action.payload) }

      if (asset !== undefined) {
        asset.changes = {}
        asset.modified = false
      }

      state.entities[action.payload] = asset
    },

    removeAsset (state, action: PayloadAction<number>): void {
      assetsAdapter.removeOne(state, action.payload)
    },

    resetAsset (state, action: PayloadAction<number>): void {
      if (state.entities[action.payload] !== undefined) {
        state.entities[action.payload] = assetsAdapter.getInitialState({ modified: false, properties: [], changes: {} }).entities[action.payload]
      }
    },

    addChanges (state, action: PayloadAction<{ assetId: number, changes: Record<string, any> }>): void {
      const asset = { ...assetsAdapter.getSelectors().selectById(state, action.payload.assetId) }

      if (asset !== undefined) {
        asset.changes = { ...asset.changes, ...action.payload.changes }
      }

      state.entities[action.payload.assetId] = asset
    }
  }
})

injectSliceWithState(slice)

export const { assetReceived, addPropertyToAsset, removePropertyFromAsset, setPropertiesForAsset, updatePropertyForAsset, addChanges, removeAsset, resetAsset, resetChanges, setChanges } = slice.actions
export const { selectById: selectAssetById } = assetsAdapter.getSelectors((state: RootState) => state['asset-draft'])
