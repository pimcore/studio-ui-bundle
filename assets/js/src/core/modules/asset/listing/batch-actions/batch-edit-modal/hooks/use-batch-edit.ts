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

import { useContext } from 'react'
import { type AssetPatchByIdApiArg, type PatchCustomMetadata } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { useRowSelection } from '@Pimcore/modules/element/listing/decorators/row-selection/context-layer/provider/use-row-selection'
import { type BatchContext, type BatchEdit, BatchEditContext } from '../batch-edit-provider'

interface UseBatchEditHookReturn extends BatchContext {
  addOrUpdateBatchEdit: (key: string, type: string, frontendType: string | undefined, locale: string | null, localizable: boolean, value: string) => void
  updateLocale: (key: string, locale: string | null) => void
  resetBatchEdits: () => void
  removeBatchEdit: (key: string) => void
  assetPatchForUpdate: () => AssetPatchByIdApiArg
}

type DataArrayType = AssetPatchByIdApiArg['body']['data']

export const useBatchEdit = (): UseBatchEditHookReturn => {
  const { batchEdits, setBatchEdits } = useContext(BatchEditContext)
  const { selectedRows } = useRowSelection()

  const resetBatchEdits = (): void => {
    setBatchEdits([])
  }

  const transformToAssetPatch = (rowId: string): DataArrayType => {
    const metaData: PatchCustomMetadata[] = batchEdits.map(batchEdit => {
      return ({
        name: batchEdit.key,
        data: batchEdit.value,
        language: batchEdit.locale
      })
    })

    return ([{
      metadata: metaData,
      id: Number(rowId)
    }])
  }

  const assetPatchForUpdate = (): AssetPatchByIdApiArg => {
    const assetPatches = Object.keys(selectedRows ?? {})
      .map(rowId => transformToAssetPatch(rowId))
      .flat()

    return ({
      body: {
        data: assetPatches
      }
    })
  }

  const updateLocale = (columnKey: string, locale: string | null): void => {
    const updatedEdits = batchEdits.map(edit => {
      if (edit.key === columnKey) {
        return {
          ...edit,
          locale
        }
      }

      return edit
    })
    setBatchEdits(updatedEdits)
  }

  const addOrUpdateBatchEdit = (key: string, type: string, frontendType: string, locale: string, localizable: boolean, value: string): void => {
    const newEdit: BatchEdit = {
      key,
      type,
      frontendType,
      locale,
      localizable,
      value
    }

    const updatedEdits: BatchEdit[] = [...batchEdits]

    const existingIndex = batchEdits.findIndex(edit => edit.key === key)

    if (existingIndex !== -1) {
      updatedEdits[existingIndex] = newEdit
    } else {
      updatedEdits.push(newEdit)
    }

    setBatchEdits(updatedEdits)
  }

  const removeBatchEdit = (key: string): void => {
    const updatedEdits = batchEdits.filter(edit => edit.key !== key)
    setBatchEdits(updatedEdits)
  }

  return {
    batchEdits,
    setBatchEdits,
    addOrUpdateBatchEdit,
    updateLocale,
    resetBatchEdits,
    removeBatchEdit,
    assetPatchForUpdate
  }
}
