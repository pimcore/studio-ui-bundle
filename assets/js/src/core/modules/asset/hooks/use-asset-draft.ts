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
import { api as assetApi, type AssetGetByIdApiResponse, type Image, type ImageData } from '../asset-api-slice-enhanced'
import {
  addCustomMetadataToAsset,
  addImageSettingsToAsset,
  addPropertyToAsset,
  addScheduleToAsset,
  assetReceived,
  removeAsset,
  removeCustomMetadataFromAsset,
  removeImageSettingFromAsset,
  removePropertyFromAsset,
  removeScheduleFromAsset,
  resetChanges,
  resetSchedulesChangesForAsset,
  selectAssetById,
  setActiveTabForAsset,
  setCustomMetadataForAsset,
  setModifiedCells,
  setPropertiesForAsset,
  setSchedulesForAsset,
  updateAllCustomMetadataForAsset,
  updateCustomMetadataForAsset,
  updateImageSettingForAsset,
  updatePropertyForAsset,
  updateScheduleForAsset
} from '../asset-draft-slice'
import { useEffect, useState } from 'react'
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
import {
  useImageSettingsDraft,
  type UseImageSettingsDraftReturn
} from '@Pimcore/modules/asset/draft/hooks/use-image-settings'
import { useSchedulesDraft, type UseSchedulesDraftReturn } from '@Pimcore/modules/element/draft/hooks/use-schedules'
import { type ElementEditorType, type TypeRegistryInterface } from '@Pimcore/modules/element/editor/services/type-registry'
import { useInjection } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { initialTabsStateValue, useTabsDraft, type UseTabsDraftReturn } from '@Pimcore/modules/element/draft/hooks/use-tabs'

export interface UseAssetDraftReturn extends
  UseCustomMetadataDraftReturn,
  UsePropertiesDraftReturn,
  UseSchedulesDraftReturn,
  UseTrackableChangesDraftReturn,
  UseTabsDraftReturn,
  UseImageSettingsDraftReturn {
  isLoading: boolean
  isError: boolean
  asset: undefined | ReturnType<typeof selectAssetById>
  editorType: ElementEditorType | undefined

  removeAssetFromState: () => void

  fetchAsset: () => void
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
  const typeRegistry = useInjection<TypeRegistryInterface>(serviceIds['Asset/Editor/TypeRegistry'])

  async function getAsset (): Promise<AssetGetByIdApiResponse> {
    const { data } = await dispatch(assetApi.endpoints.assetGetById.initiate({ id }))

    if (data !== undefined) {
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
    if (asset === undefined) {
      fetchAsset()
    } else {
      setIsLoading(false)
    }
  }, [asset])

  function fetchAsset (): void {
    setIsLoading(true)

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
        changes: {},
        modifiedCells: {},
        ...initialTabsStateValue
      }

      if (assetData !== undefined) {
        dispatch(assetReceived(mergedAssetData))
      }

      return mergedAssetData
    }).catch((e) => {
      console.error(e)
      setIsError(true)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  function removeAssetFromState (): void {
    if (asset === undefined) return

    dispatch(removeAsset(asset.id))
  }

  const trackableChangesActions = useTrackableChangesDraft(
    id,
    resetChanges,
    setModifiedCells
  )

  const propertyActions = usePropertiesDraft(
    id,
    asset,
    updatePropertyForAsset,
    addPropertyToAsset,
    removePropertyFromAsset,
    setPropertiesForAsset
  )

  const schedulesActions = useSchedulesDraft(
    id,
    asset,
    updateScheduleForAsset,
    addScheduleToAsset,
    removeScheduleFromAsset,
    setSchedulesForAsset,
    resetSchedulesChangesForAsset
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

  const imageSettingsActions = useImageSettingsDraft(
    id,
    asset,
    addImageSettingsToAsset,
    removeImageSettingFromAsset,
    updateImageSettingForAsset
  )

  const tabsActions = useTabsDraft(
    id,
    asset,
    setActiveTabForAsset
  )

  const editorType = asset?.type === undefined
    ? undefined
    : (typeRegistry.get(asset.type) ?? typeRegistry.get('unknown'))

  return {
    isLoading,
    isError,
    asset,
    editorType,
    removeAssetFromState,
    fetchAsset,
    ...trackableChangesActions,
    ...propertyActions,
    ...schedulesActions,
    ...customMetadataActions,
    ...imageSettingsActions,
    ...tabsActions
  }
}
