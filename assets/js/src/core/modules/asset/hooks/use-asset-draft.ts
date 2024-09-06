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

import { useAppDispatch, useAppSelector } from '@Pimcore/app/store'
import { api as assetApi, type AssetGetByIdApiResponse, type Image, type ImageData } from '../asset-api-slice.gen'
import {
  type Schedule,
  addCustomMetadataToAsset,
  addImageSettingsToAsset,
  addPropertyToAsset,
  addScheduleToAsset,
  assetReceived,
  type CustomMetadata,
  type DataProperty,
  removeAsset,
  removeCustomMetadataFromAsset,
  removeImageSettingFromAsset,
  removePropertyFromAsset,
  removeScheduleFromAsset,
  resetChanges,
  resetSchedulesChangesForAsset,
  selectAssetById,
  setCustomMetadataForAsset,
  setPropertiesForAsset,
  setSchedulesForAsset,
  updateAllCustomMetadataForAsset,
  updateImageSettingForAsset,
  updatePropertyForAsset, updateScheduleForAsset
} from '../asset-draft-slice'
import { useEffect, useState } from 'react'
import {
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/settings-slice.gen'
import { api as settingsApi } from '@Pimcore/modules/app/settings/settings-slice.gen'

interface UseAssetDraftReturnCustomMetadata {
  customMetadata: undefined | ReturnType<typeof selectAssetById>['customMetadata']
  updateAllCustomMetadata: (customMetadata: CustomMetadata[]) => void
  addCustomMetadata: (customMetadata: CustomMetadata) => void
  removeCustomMetadata: (customMetadata: CustomMetadata) => void
  setCustomMetadata: (customMetadata: CustomMetadata[]) => void
}

interface UseAssetDraftReturnProperties {
  properties: undefined | ReturnType<typeof selectAssetById>['properties']
  updateProperty: (key: string, updatedProperty: DataProperty) => void
  addProperty: (property: DataProperty) => void
  removeProperty: (property: DataProperty) => void
  setProperties: (properties: DataProperty[]) => void
}

interface UseAssetDraftReturnSchedule {
  schedules: undefined | ReturnType<typeof selectAssetById>['schedules']
  updateSchedule: (updatedSchedule: Schedule) => void
  addSchedule: (schedule: Schedule) => void
  removeSchedule: (schedule: Schedule) => void
  setSchedules: (schedules: Schedule[]) => void
  resetSchedulesChanges: () => void
}

interface UseAssetDraftReturnDynamicSettings {
  imageSettings: undefined | ImageData
  addImageSettings: (settings: ImageData) => void
  updateImageSetting: ({ key, value }: { key: keyof ImageData, value: ImageData[keyof ImageData] }) => void
  removeImageSetting: (setting: keyof ImageData) => void
}

interface UseAssetDraftReturn extends
  UseAssetDraftReturnCustomMetadata,
  UseAssetDraftReturnProperties,
  UseAssetDraftReturnSchedule,
  UseAssetDraftReturnDynamicSettings {
  isLoading: boolean
  isError: boolean
  asset: undefined | ReturnType<typeof selectAssetById>

  removeAssetFromState: () => void
  removeTrackedChanges: () => void
}

interface DynamicCustomSettings {
  focalPointX: number
  focalPointY: number
}

export const useAssetDraft = (id: number): UseAssetDraftReturn => {
  const dispatch = useAppDispatch()
  const asset = useAppSelector(state => selectAssetById(state, id))
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const properties = asset?.properties
  const customMetadata = asset?.customMetadata
  const schedules = asset?.schedules
  const imageSettings = asset?.imageSettings

  async function getAsset (): Promise<AssetGetByIdApiResponse> {
    const { data, isSuccess } = await dispatch(assetApi.endpoints.assetGetById.initiate({ id }))

    if (data !== undefined && isSuccess) {
      return data
    }

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return {} as Image
  }

  async function getCustomSettings (): Promise<ImageData> {
    let objectToReturn: ImageData = {}
    const { data, isSuccess } = await dispatch(settingsApi.endpoints.assetCustomSettingsGetById.initiate({ id }))

    if (isSuccess && data !== undefined) {
      const settings = data.items!
      const dynamicSettings = settings?.dynamicCustomSettings as any as DynamicCustomSettings

      if (
        dynamicSettings !== undefined &&
        Object.prototype.hasOwnProperty.call(dynamicSettings, 'focalPointX') === true &&
        Object.prototype.hasOwnProperty.call(dynamicSettings, 'focalPointY') === true
      ) {
        const focalPoint: ImageData['focalPoint'] = {
          x: dynamicSettings.focalPointX,
          y: dynamicSettings.focalPointY
        }

        objectToReturn = {
          ...objectToReturn,
          focalPoint
        }
      }
    }

    return objectToReturn
  }

  useEffect(() => {
    Promise.all([
      getAsset(),
      getCustomSettings()
    ]).then(([assetData, customSettingsResponse]) => {
      const mergedAssetData = {
        ...assetData,
        id,
        modified: false,
        properties: [],
        customMetadata: [],
        schedules: [],
        imageSettings: customSettingsResponse,
        changes: {}
      }

      if (asset === undefined && assetData !== undefined) {
        dispatch(assetReceived(mergedAssetData))
      }

      return mergedAssetData
    }).catch((e) => {
      console.error(e)
      setIsError(true)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])

  function removeAssetFromState (): void {
    if (asset === undefined) return

    dispatch(removeAsset(asset.id))
  }

  function updateProperty (key, property): void {
    dispatch(updatePropertyForAsset({ assetId: id, key, property }))
  }

  function addProperty (property): void {
    dispatch(addPropertyToAsset({ assetId: id, property }))
  }

  function removeProperty (property): void {
    dispatch(removePropertyFromAsset({ assetId: id, property }))
  }

  function setProperties (properties): void {
    dispatch(setPropertiesForAsset({ assetId: id, properties }))
  }

  function updateAllCustomMetadata (customMetadata): void {
    dispatch(updateAllCustomMetadataForAsset({ assetId: id, customMetadata }))
  }

  function addCustomMetadata (customMetadata): void {
    dispatch(addCustomMetadataToAsset({ assetId: id, customMetadata }))
  }

  function removeCustomMetadata (customMetadata): void {
    dispatch(removeCustomMetadataFromAsset({ assetId: id, customMetadata }))
  }

  function setCustomMetadata (customMetadata): void {
    dispatch(setCustomMetadataForAsset({ assetId: id, customMetadata }))
  }

  function updateSchedule (schedule): void {
    dispatch(updateScheduleForAsset({ assetId: id, schedule }))
  }
  function addSchedule (schedule): void {
    dispatch(addScheduleToAsset({ assetId: id, schedule }))
  }
  function removeSchedule (schedule): void {
    dispatch(removeScheduleFromAsset({ assetId: id, schedule }))
  }
  function setSchedules (schedules): void {
    dispatch(setSchedulesForAsset({ assetId: id, schedules }))
  }

  function resetSchedulesChanges (): void {
    dispatch(resetSchedulesChangesForAsset(id))
  }

  function addImageSettings (settings): void {
    dispatch(addImageSettingsToAsset({ assetId: id, settings }))
  }

  function removeImageSetting (setting): void {
    dispatch(removeImageSettingFromAsset({ assetId: id, setting }))
  }

  function updateImageSetting ({ key, value }): void {
    dispatch(updateImageSettingForAsset({ assetId: id, key, value }))
  }

  function removeTrackedChanges (): void {
    dispatch(resetChanges(id))
  }

  return {
    isLoading,
    isError,
    asset,
    removeAssetFromState,

    // Properties
    properties,
    updateProperty,
    addProperty,
    removeProperty,
    setProperties,

    // Custom Metadata
    customMetadata,
    updateAllCustomMetadata,
    addCustomMetadata,
    removeCustomMetadata,
    setCustomMetadata,

    // Schedule
    schedules,
    updateSchedule,
    addSchedule,
    removeSchedule,
    setSchedules,
    resetSchedulesChanges,

    // Image Settings
    imageSettings,
    addImageSettings,
    removeImageSetting,
    updateImageSetting,

    // Changes
    removeTrackedChanges
  }
}
