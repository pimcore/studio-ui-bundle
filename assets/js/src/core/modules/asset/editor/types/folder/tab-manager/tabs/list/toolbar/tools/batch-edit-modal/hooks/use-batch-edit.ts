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
import {
  type BatchContext, type BatchEdit,
  BatchEditContext
} from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/list/toolbar/tools/batch-edit-modal/batch-edit-provider'
import { type AssetPatchByIdApiArg, type PatchCustomMetadata } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { useListSelectedRows } from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/list/hooks/use-list'

interface UseBatchEditHookReturn extends BatchContext {
  addOrUpdateBatchEdit: (columnKey: string, columnType: string, columnValue: string) => void
  resetBatchEdits: () => void
  removeBatchEdit: (key: string) => void
  assetPatchForUpdate: () => AssetPatchByIdApiArg
}

type DataArrayType = AssetPatchByIdApiArg['body']['data']

export const useBatchEdit = (): UseBatchEditHookReturn => {
  const { batchEdits, setBatchEdits } = useContext(BatchEditContext)
  const { selectedRows } = useListSelectedRows()

  const resetBatchEdits = (): void => {
    setBatchEdits([])
  }

  const transformToAssetPatch = (rowId: string): DataArrayType => {
    const metaData: PatchCustomMetadata[] = batchEdits.map(batchEdit => ({
      name: batchEdit.type,
      data: batchEdit.value
    }))

    return ([{
      metadata: metaData,
      id: Number(rowId)
    }])
  }

  const assetPatchForUpdate = (): AssetPatchByIdApiArg => {
    const assetPatches = Object.keys(selectedRows)
      .map(rowId => transformToAssetPatch(rowId))
      .flat()

    return ({
      body: {
        data: assetPatches
      }
    })
  }

  const addOrUpdateBatchEdit = (columnKey: string, columnType: string, value: string): void => {
    const newEdit: BatchEdit = {
      key: columnKey,
      type: columnType,
      value
    }

    const updatedEdits: BatchEdit[] = [...batchEdits]

    const existingIndex = batchEdits.findIndex(edit => edit.key === columnKey)

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
    resetBatchEdits,
    removeBatchEdit,
    assetPatchForUpdate
  }
}
