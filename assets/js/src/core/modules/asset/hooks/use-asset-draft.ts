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
  addCustomMetadataToAsset,
  addImageSettingsToAsset, addPropertyToAsset,
  assetReceived,
  removeAsset,
  removeCustomMetadataFromAsset,
  removeImageSettingFromAsset, removePropertyFromAsset,
  resetChanges,
  selectAssetById,
  setCustomMetadataForAsset, setPropertiesForAsset,
  updateAllCustomMetadataForAsset, updateCustomMetadataForAsset,
  updateImageSettingForAsset,
  updatePropertyForAsset
} from '../asset-draft-slice'
import { useEffect, useState } from 'react'
import {
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/settings-slice.gen'
import { api as settingsApi } from '@Pimcore/modules/app/settings/settings-slice.gen'
import { usePropertiesDraft, type UsePropertiesDraftReturn } from '@Pimcore/modules/element/draft/hooks/use-properties'
import {
  useCustomMetadataDraft,
  type UseCustomMetadataDraftReturn
} from '@Pimcore/modules/asset/draft/hooks/use-custom-metadata'
import {
  useTrackableChangesDraft,
  type UseTrackableChangesDraftReturn
} from '@Pimcore/modules/element/draft/hooks/use-trackable-changes'

interface UseAssetDraftReturnDynamicSettings {
  imageSettings: undefined | ImageData
  addImageSettings: (settings: ImageData) => void
  updateImageSetting: ({ key, value }: { key: keyof ImageData, value: ImageData[keyof ImageData] }) => void
  removeImageSetting: (setting: keyof ImageData) => void
}

interface UseAssetDraftReturn extends
  UseCustomMetadataDraftReturn,
  UsePropertiesDraftReturn,
  UseTrackableChangesDraftReturn,
  UseAssetDraftReturnDynamicSettings {
  isLoading: boolean
  isError: boolean
  asset: undefined | ReturnType<typeof selectAssetById>

  removeAssetFromState: () => void
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

  const trackableChangesActions = useTrackableChangesDraft(
    id,
    resetChanges
  )

  const propertyActions = usePropertiesDraft(
    id,
    asset,
    updatePropertyForAsset,
    addPropertyToAsset,
    removePropertyFromAsset,
    setPropertiesForAsset
  )

  const customMetadataActions = useCustomMetadataDraft(
    id,
    asset,
    updateCustomMetadataForAsset,
    addCustomMetadataToAsset,
    removeCustomMetadataFromAsset,
    setCustomMetadataForAsset,
    updateAllCustomMetadataForAsset
  )

  function addImageSettings (settings): void {
    dispatch(addImageSettingsToAsset({ assetId: id, settings }))
  }

  function removeImageSetting (setting): void {
    dispatch(removeImageSettingFromAsset({ assetId: id, setting }))
  }

  function updateImageSetting ({ key, value }): void {
    dispatch(updateImageSettingForAsset({ assetId: id, key, value }))
  }

  return {
    isLoading,
    isError,
    asset,
    ...trackableChangesActions,
    ...propertyActions,
    ...customMetadataActions,
    imageSettings,
    addImageSettings,
    removeImageSetting,
    updateImageSetting,
    removeAssetFromState
  }
}
