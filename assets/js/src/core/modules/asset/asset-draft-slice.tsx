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
import { type Asset, type ImageData } from './asset-api-slice.gen'
import { type RootState, injectSliceWithState } from '@Pimcore/app/store'
import { type CustomMetadata as CustomMetadataApi } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/settings-slice.gen'
import { type PropertiesDraft, usePropertiesReducers } from '@Pimcore/modules/element/draft/hooks/use-properties'
import { type EntityAdapter } from '@reduxjs/toolkit/src/entities/models'
import { type TrackableChangesDraft } from '@Pimcore/modules/element/draft/trackable-changes-draft'

export type CustomMetadata = CustomMetadataApi & {
  rowId: string
}

interface customMetadataAction {
  assetId: number
  customMetadata: CustomMetadata
}

export interface AssetDraft extends Asset, PropertiesDraft, TrackableChangesDraft {
  customMetadata: CustomMetadata[]
  imageSettings: ImageData
}

export const assetsAdapter: EntityAdapter<AssetDraft, number> = createEntityAdapter<AssetDraft>({})

export const slice = createSlice({
  name: 'asset-draft',
  initialState: assetsAdapter.getInitialState({
    modified: false,
    properties: [],
    customMetadata: [],
    imageSettings: [],
    changes: {}
  }),
  reducers: {
    assetReceived: assetsAdapter.upsertOne,

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
    },

    // TODO: Remove this function

    addCustomMetadataToAsset: (state, action: PayloadAction<customMetadataAction>) => {
      const asset = { ...assetsAdapter.getSelectors().selectById(state, action.payload.assetId) }

      if (asset !== undefined) {
        asset.customMetadata = [...(asset.customMetadata ?? []), action.payload.customMetadata]

        asset.modified = true

        asset.changes = {
          ...asset.changes,
          customMetadata: true
        }
      }

      state.entities[action.payload.assetId] = asset
    },

    removeCustomMetadataFromAsset: (state, action: PayloadAction<customMetadataAction>) => {
      const asset = { ...assetsAdapter.getSelectors().selectById(state, action.payload.assetId) }

      if (asset !== undefined) {
        asset.customMetadata = (asset.customMetadata ?? []).filter(
          customMetadata =>
            customMetadata.name !== action.payload.customMetadata.name ||
              customMetadata.language !== action.payload.customMetadata.language
        )

        asset.modified = true

        asset.changes = {
          ...asset.changes,
          customMetadata: true
        }
      }

      state.entities[action.payload.assetId] = asset
    },

    updateCustomMetadataForAsset: (state, action: PayloadAction<customMetadataAction>) => {
      const asset = { ...assetsAdapter.getSelectors().selectById(state, action.payload.assetId) }

      if (asset !== undefined) {
        asset.customMetadata = (asset.customMetadata ?? []).map(customMetadata => {
          if (customMetadata.name === action.payload.customMetadata.name) {
            asset.modified = true

            asset.changes = {
              ...asset.changes,
              customMetadata: true
            }

            return action.payload.customMetadata
          }

          return customMetadata
        })
      }

      state.entities[action.payload.assetId] = asset
    },

    updateAllCustomMetadataForAsset: (state, action: PayloadAction<{ assetId: number, customMetadata: CustomMetadata[] }>) => {
      const asset = { ...assetsAdapter.getSelectors().selectById(state, action.payload.assetId) }

      if (asset !== undefined) {
        asset.customMetadata = action.payload.customMetadata
      }

      asset.modified = true

      asset.changes = {
        ...asset.changes,
        customMetadata: true
      }

      state.entities[action.payload.assetId] = asset
    },

    setCustomMetadataForAsset: (state, action: PayloadAction<{ assetId: number, customMetadata: CustomMetadata[] }>) => {
      const asset = { ...assetsAdapter.getSelectors().selectById(state, action.payload.assetId) }

      if (asset !== undefined) {
        asset.customMetadata = action.payload.customMetadata
      }

      state.entities[action.payload.assetId] = asset
    },

    // TODO: check if we really need that
    addImageSettingsToAsset: (state, action: PayloadAction<{ assetId: number, settings: ImageData }>) => {
      const asset = { ...assetsAdapter.getSelectors().selectById(state, action.payload.assetId) }

      if (asset !== undefined) {
        asset.imageSettings = { ...asset.imageSettings, ...action.payload.settings }

        asset.modified = true

        asset.changes = {
          ...asset.changes,
          imageSettings: true
        }
      }

      state.entities[action.payload.assetId] = asset
    },

    removeImageSettingFromAsset: (state, action: PayloadAction<{ assetId: number, setting: keyof ImageData }>) => {
      const asset = { ...assetsAdapter.getSelectors().selectById(state, action.payload.assetId) }

      if (Object.prototype.hasOwnProperty.call(asset.imageSettings, action.payload.setting) === true) {
        const clonedImageSettings = structuredClone(asset.imageSettings)
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete clonedImageSettings[action.payload.setting]

        asset.imageSettings = { ...clonedImageSettings }

        asset.modified = true

        asset.changes = {
          ...asset.changes,
          imageSettings: true
        }
      }

      state.entities[action.payload.assetId] = asset
    },

    updateImageSettingForAsset: (state, action: PayloadAction<{ assetId: number, key: keyof ImageData, value: ImageData[keyof ImageData] }>) => {
      const asset = { ...assetsAdapter.getSelectors().selectById(state, action.payload.assetId) }

      asset.imageSettings[action.payload.key] = action.payload.value

      asset.modified = true

      asset.changes = {
        ...asset.changes,
        imageSettings: true
      }

      state.entities[action.payload.assetId] = asset
    },
    ...usePropertiesReducers(assetsAdapter)
  }
})

injectSliceWithState(slice)

export const {
  assetReceived,
  updateAllCustomMetadataForAsset,
  addChanges,
  addCustomMetadataToAsset,
  removeCustomMetadataFromAsset,
  updateCustomMetadataForAsset,
  setCustomMetadataForAsset,

  addImageSettingsToAsset,
  removeImageSettingFromAsset,
  updateImageSettingForAsset,

  removeAsset,
  resetAsset,
  resetChanges,
  setChanges,

  addProperty: addPropertyToAsset,
  removeProperty: removePropertyFromAsset,
  setProperties: setPropertiesForAsset,
  updateProperty: updatePropertyForAsset
} = slice.actions
export const { selectById: selectAssetById } = assetsAdapter.getSelectors((state: RootState) => state['asset-draft'])
