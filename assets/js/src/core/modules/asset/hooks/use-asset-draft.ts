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
import { useGetAssetByIdQuery } from '../asset-api-slice.gen'
import {
  addPropertyToAsset,
  assetReceived,
  removeAsset,
  resetChanges,
  removePropertyFromAsset,
  selectAssetById,
  setPropertiesForAsset,
  updatePropertyForAsset,
  updateCustomMetadataForAsset, addCustomMetadataToAsset, removeCustomMetadataFromAsset, setCustomMetadataForAsset
} from '../asset-draft-slice'
import { useEffect } from 'react'
import { type DataProperty } from '../properties-api-slice.gen'
import { type CustomMetadata } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/settings-slice.gen'

interface UseAssetDraftReturnCustomMetadata {
  customMetadata: undefined | ReturnType<typeof selectAssetById>['customMetadata']
  updateCustomMetadata: (customMetadata: CustomMetadata) => void
  addCustomMetadata: (customMetadata: CustomMetadata) => void
  removeCustomMetadata: (customMetadata: CustomMetadata) => void
  setCustomMetadata: (customMetadata: CustomMetadata[]) => void
}

interface UseAssetDraftReturnProperties {
  properties: undefined | ReturnType<typeof selectAssetById>['properties']
  updateProperty: (property: DataProperty) => void
  addProperty: (property: DataProperty) => void
  removeProperty: (property: DataProperty) => void
  setProperties: (properties: DataProperty[]) => void
}

interface UseAssetDraftReturn extends
  UseAssetDraftReturnCustomMetadata,
  UseAssetDraftReturnProperties {
  isLoading: boolean
  isError: boolean
  asset: undefined | ReturnType<typeof selectAssetById>

  removeAssetFromState: () => void
  removeTrackedChanges: () => void
}

export const useAssetDraft = (id: number): UseAssetDraftReturn => {
  const { isLoading, isError, data } = useGetAssetByIdQuery({ id })
  const dispatch = useAppDispatch()
  const asset = useAppSelector(state => selectAssetById(state, id))
  const properties = asset?.properties
  const customMetadata = asset?.customMetadata

  useEffect(() => {
    if (data !== undefined && asset === undefined) {
      dispatch(assetReceived({
        ...data,
        id,
        modified: false,
        properties: [],
        customMetadata: [],
        changes: {}
      }))
    }
  }, [data])

  function removeAssetFromState (): void {
    if (asset === undefined) return

    dispatch(removeAsset(asset.id))
  }

  function updateProperty (property): void {
    dispatch(updatePropertyForAsset({ assetId: id, property }))
  };

  function addProperty (property): void {
    dispatch(addPropertyToAsset({ assetId: id, property }))
  };

  function removeProperty (property): void {
    dispatch(removePropertyFromAsset({ assetId: id, property }))
  }

  function setProperties (properties): void {
    dispatch(setPropertiesForAsset({ assetId: id, properties }))
  }

  function updateCustomMetadata (customMetadata): void {
    dispatch(updateCustomMetadataForAsset({ assetId: id, customMetadata }))
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

  function removeTrackedChanges (): void {
    dispatch(resetChanges(id))
  }

  return {
    isLoading,
    isError,
    asset,
    properties,
    updateProperty,
    addProperty,
    removeProperty,
    setProperties,
    customMetadata,
    updateCustomMetadata,
    addCustomMetadata,
    removeCustomMetadata,
    setCustomMetadata,
    removeAssetFromState,
    removeTrackedChanges
  }
}
