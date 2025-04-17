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

import { useAppSelector } from '@Pimcore/app/store'
import {
  addCustomMetadataToAsset,
  addImageSettingsToAsset,
  addPropertyToAsset,
  addScheduleToAsset, removeCustomMetadataFromAsset,
  setCustomSettingsForAsset,
  removeCustomSettingsFromAsset,
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
  updateScheduleForAsset,
  updateTextDataForAsset
} from '../asset-draft-slice'
import { useEffect, useState } from 'react'
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
import { useTabsDraft, type UseTabsDraftReturn } from '@Pimcore/modules/element/draft/hooks/use-tabs'
import { useTextDataDraft, type UseTextDataDraftReturn } from '@Pimcore/modules/asset/draft/hooks/use-text-settings'
import { useCustomSettingsDraft, type UseCustomSettingsDraftReturn } from '@Pimcore/modules/asset/draft/hooks/use-custom-settings'
import { isFailedDraftId } from '../asset-draft-error-slice'

export interface UseAssetDraftReturn extends
  UseCustomMetadataDraftReturn,
  UseCustomSettingsDraftReturn,
  UsePropertiesDraftReturn,
  UseSchedulesDraftReturn,
  UseTrackableChangesDraftReturn,
  UseTabsDraftReturn,
  UseTextDataDraftReturn,
  UseImageSettingsDraftReturn {
  isLoading: boolean
  isError: boolean
  asset: undefined | ReturnType<typeof selectAssetById>
  editorType: ElementEditorType | undefined
}

export const useAssetDraft = (id: number): UseAssetDraftReturn => {
  const asset = useAppSelector(state => selectAssetById(state, id))
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const typeRegistry = useInjection<TypeRegistryInterface>(serviceIds['Asset/Editor/TypeRegistry'])
  const isError = useAppSelector((state) => isFailedDraftId(state, id))

  useEffect(() => {
    if (asset === undefined) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [asset])

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

  const customSettingsActions = useCustomSettingsDraft({
    id,
    draft: asset,
    setCustomSettingsAction: setCustomSettingsForAsset,
    removeCustomSettingsAction: removeCustomSettingsFromAsset
  })

  const imageSettingsActions = useImageSettingsDraft(
    id,
    asset,
    addImageSettingsToAsset,
    removeImageSettingFromAsset,
    updateImageSettingForAsset
  )

  const textDataActions = useTextDataDraft({
    id,
    draft: asset,
    updateTextDataAction: updateTextDataForAsset
  })

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
    ...trackableChangesActions,
    ...propertyActions,
    ...schedulesActions,
    ...customMetadataActions,
    ...customSettingsActions,
    ...imageSettingsActions,
    ...textDataActions,
    ...tabsActions
  }
}
