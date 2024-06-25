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
import { addPropertyToAsset, assetReceived, removeAsset, removePropertyFromAsset, selectAssetById, setPropertiesForAsset, updatePropertyForAsset } from '../asset-draft-slice'
import { useEffect } from 'react'
import { type DataProperty } from '../properties-api-slice.gen'

interface UseAssetDraftReturn {
  isLoading: boolean
  isError: boolean
  asset: undefined | ReturnType<typeof selectAssetById>
  properties: undefined | ReturnType<typeof selectAssetById>['properties']
  updateProperty: (property: DataProperty) => void
  addProperty: (property: DataProperty) => void
  removeProperty: (property: DataProperty) => void
  setProperties: (properties: DataProperty[]) => void
  removeAssetFromState: () => void
}

export const useAssetDraft = (id: number): UseAssetDraftReturn => {
  const { isLoading, isError, data } = useGetAssetByIdQuery({ id })
  const dispatch = useAppDispatch()
  const asset = useAppSelector(state => selectAssetById(state, id))
  const properties = asset?.properties

  useEffect(() => {
    if (data !== undefined && asset === undefined) {
      dispatch(assetReceived({ ...data, id, modified: false, properties: [], changes: {} }))
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
  };

  function setProperties (properties): void {
    dispatch(setPropertiesForAsset({ assetId: id, properties }))
  };

  return { isLoading, isError, asset, properties, updateProperty, addProperty, removeProperty, setProperties, removeAssetFromState }
}
