/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useAppDispatch } from '@Pimcore/app/store'
import { api as assetApi, type AssetGetByIdApiResponse, type ImageData } from '../asset-api-slice-enhanced'

import { assetReceived } from '../asset-draft-slice'
import { isUndefined } from 'lodash'
import { initialTabsStateValue } from '@Pimcore/modules/element/draft/hooks/use-tabs'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { api as settingsApi } from '@Pimcore/modules/app/settings/settings-slice.gen'
import { addFailedDraftId, removeFailedDraftId } from '../asset-draft-error-slice'

// Global map to track fetching drafts
const fetchingDrafts = new Map<number, boolean>()

interface DynamicCustomSettings {
  focalPointX: number
  focalPointY: number
}

interface UseAssetDraftFetcherReturn {
  updateAssetDraft: (id: number, forceRefetch?: boolean) => Promise<void>
}

export const useAssetDraftFetcher = (): UseAssetDraftFetcherReturn => {
  const dispatch = useAppDispatch()

  async function getAsset (id: number): Promise<AssetGetByIdApiResponse | undefined> {
    const { data, isError: isGetAssetError, error: getAssetError } = await dispatch(assetApi.endpoints.assetGetById.initiate({ id }))

    if (isGetAssetError) {
      trackError(new ApiError(getAssetError))
      dispatch(addFailedDraftId(id))
    }

    return data
  }

  async function getCustomSettings (id: number): Promise<ImageData | undefined> {
    let objectToReturn: ImageData = {}
    const { data, isSuccess, isError: isAssetCustomSettingsError, error: assetCustomSettingsError } = await dispatch(settingsApi.endpoints.assetCustomSettingsGetById.initiate({ id }))

    if (isAssetCustomSettingsError) {
      trackError(new ApiError(assetCustomSettingsError))
      dispatch(addFailedDraftId(id))
      return undefined
    }

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

  const updateAssetDraft = async (id: number, forceRefetch: boolean = false): Promise<void> => {
    if (fetchingDrafts.get(id) === true && !forceRefetch) {
      return
    }

    fetchingDrafts.set(id, true)
    try {
      await Promise.all([
        getAsset(id),
        getCustomSettings(id)
      ]).then(([assetData, customSettingsResponse]) => {
        if (!isUndefined(assetData) && !isUndefined(customSettingsResponse)) {
          const mergedAssetData = {
            ...assetData,
            id,
            modified: false,
            properties: [],
            customMetadata: [],
            customSettings: [],
            schedules: [],
            textData: '',
            imageSettings: customSettingsResponse,
            changes: {},
            modifiedCells: {},
            ...initialTabsStateValue
          }

          dispatch(assetReceived(mergedAssetData))
          dispatch(removeFailedDraftId(id))
        }
      })
    } finally {
      fetchingDrafts.delete(id)
    }
  }

  return {
    updateAssetDraft
  }
}
