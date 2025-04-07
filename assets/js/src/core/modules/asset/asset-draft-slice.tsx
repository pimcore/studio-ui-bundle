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
import { type Asset, type ImageData } from './asset-api-slice-enhanced'
import { type RootState, injectSliceWithState } from '@Pimcore/app/store'
import { type PropertiesDraft, usePropertiesReducers } from '@Pimcore/modules/element/draft/hooks/use-properties'
import { type EntityAdapter } from '@reduxjs/toolkit/src/entities/models'
import { type CustomMetadataDraft, useCustomMetadataReducers } from '@Pimcore/modules/asset/draft/hooks/use-custom-metadata'
import { type CustomSettingsDraft, useCustomSettingsReducers } from '@Pimcore/modules/asset/draft/hooks/use-custom-settings'
import { type TrackableChangesDraft, useTrackableChangesReducers } from '@Pimcore/modules/element/draft/hooks/use-trackable-changes'
import { useImageSettingsReducers } from '@Pimcore/modules/asset/draft/hooks/use-image-settings'
import { type TextDataDraft, useTextDataReducers } from '@Pimcore/modules/asset/draft/hooks/use-text-settings'
import { type SchedulesDraft, useSchedulesReducers } from '@Pimcore/modules/element/draft/hooks/use-schedules'
import { initialTabsStateValue, type TabsDraft, useTabsReducers } from '../element/draft/hooks/use-tabs'

export interface AssetDraft extends Asset, PropertiesDraft, SchedulesDraft, CustomMetadataDraft, CustomSettingsDraft, TextDataDraft, TrackableChangesDraft, TabsDraft {
  imageSettings: ImageData
}

export const assetsAdapter: EntityAdapter<AssetDraft, number> = createEntityAdapter<AssetDraft>({})

export const slice = createSlice({
  name: 'asset-draft',
  initialState: assetsAdapter.getInitialState({
    modified: false,
    properties: [],
    customMetadata: [],
    customSettings: [],
    textData: {},
    imageSettings: [],
    schedule: [],
    changes: {},
    modifiedCells: {},
    ...initialTabsStateValue
  }),
  reducers: {
    assetReceived: assetsAdapter.upsertOne,

    removeAsset (state, action: PayloadAction<number>): void {
      assetsAdapter.removeOne(state, action.payload)
    },

    resetAsset (state, action: PayloadAction<number>): void {
      if (state.entities[action.payload] !== undefined) {
        state.entities[action.payload] = assetsAdapter.getInitialState({ modified: false, properties: [], changes: {} }).entities[action.payload]
      }
    },
    ...useTrackableChangesReducers(assetsAdapter),
    ...usePropertiesReducers(assetsAdapter),
    ...useSchedulesReducers(assetsAdapter),
    ...useCustomMetadataReducers(assetsAdapter),
    ...useCustomSettingsReducers(assetsAdapter),
    ...useImageSettingsReducers(assetsAdapter),
    ...useTextDataReducers(assetsAdapter),
    ...useTabsReducers(assetsAdapter)
  }
})

injectSliceWithState(slice)

export const {
  assetReceived,
  removeAsset,
  resetAsset,

  resetChanges,
  setModifiedCells,

  addImageSettings: addImageSettingsToAsset,
  removeImageSetting: removeImageSettingFromAsset,
  updateImageSetting: updateImageSettingForAsset,

  addProperty: addPropertyToAsset,
  removeProperty: removePropertyFromAsset,
  setProperties: setPropertiesForAsset,
  updateProperty: updatePropertyForAsset,

  addSchedule: addScheduleToAsset,
  removeSchedule: removeScheduleFromAsset,
  setSchedules: setSchedulesForAsset,
  updateSchedule: updateScheduleForAsset,
  resetSchedulesChanges: resetSchedulesChangesForAsset,

  updateAllCustomMetadata: updateAllCustomMetadataForAsset,
  addCustomMetadata: addCustomMetadataToAsset,
  removeCustomMetadata: removeCustomMetadataFromAsset,
  updateCustomMetadata: updateCustomMetadataForAsset,
  setCustomMetadata: setCustomMetadataForAsset,
  setActiveTab: setActiveTabForAsset,

  updateTextData: updateTextDataForAsset,

  setCustomSettings: setCustomSettingsForAsset,
  removeCustomSettings: removeCustomSettingsFromAsset
} = slice.actions
export const { selectById: selectAssetById } = assetsAdapter.getSelectors((state: RootState) => state['asset-draft'])
