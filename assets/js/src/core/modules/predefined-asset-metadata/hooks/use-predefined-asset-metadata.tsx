/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect } from 'react'
import trackError, { ApiError, getErrorKey, ErrorKeyTypes } from '@Pimcore/modules/app/error-handler'
import {
  type PredefinedMetadata,
  type UpdatePredefinedMetadata,
  useMetadataPredefinedCreateMutation,
  useMetadataPredefinedUpdateMutation,
  useMetadataPredefinedDeleteMutation
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/metadata-api-slice-enhanced'

export type PredefinedAssetMetadataRow = PredefinedMetadata & { rowId: string }

interface MutationResult<T = void> {
  success: boolean
  data?: T
  errorKey?: string
}

interface UsePredefinedAssetMetadataReturn {
  createNewMetadata: () => Promise<MutationResult<PredefinedMetadata>>
  createLoading: boolean
  deleteMetadataById: (id: string) => Promise<MutationResult>
  deleteLoading: boolean
  updateMetadataById: (id: string, row: PredefinedAssetMetadataRow) => Promise<MutationResult>
  updateLoading: boolean
}

const toApiMetadata = (row: PredefinedAssetMetadataRow): UpdatePredefinedMetadata => ({
  name: row.name ?? '',
  description: row.description ?? null,
  type: row.type.includes('metadata.') ? row.type.split('.')[1] ?? row.type : row.type,
  targetSubType: row.targetSubType ?? null,
  data: row.data ?? null,
  config: row.config ?? null,
  language: row.language ?? null,
  group: row.group ?? null
})

export const usePredefinedAssetMetadata = (): UsePredefinedAssetMetadataReturn => {
  const [createMetadata, { isLoading: createLoading, error: createError }] = useMetadataPredefinedCreateMutation()
  const [deleteMetadata, { isLoading: deleteLoading, error: deleteError }] = useMetadataPredefinedDeleteMutation()
  const [updateMetadata, { isLoading: updateLoading, error: updateError }] = useMetadataPredefinedUpdateMutation()

  useEffect(() => {
    if (createError !== undefined && getErrorKey(createError) !== ErrorKeyTypes.INVALID_ARGUMENT) {
      trackError(new ApiError(createError))
    }
  }, [createError])

  useEffect(() => {
    if (deleteError !== undefined) {
      trackError(new ApiError(deleteError))
    }
  }, [deleteError])

  useEffect(() => {
    if (updateError !== undefined && getErrorKey(updateError) !== ErrorKeyTypes.INVALID_ARGUMENT) {
      trackError(new ApiError(updateError))
    }
  }, [updateError])

  const createNewMetadata = async (): Promise<MutationResult<PredefinedMetadata>> => {
    const { data, error } = await createMetadata({
      createPredefinedMetadata: {
        name: '',
        type: 'input',
        description: null,
        targetSubType: null,
        data: null,
        config: null,
        language: null,
        group: null
      }
    })

    if (error !== undefined) {
      return { success: false, errorKey: getErrorKey(error) }
    }

    return data !== undefined
      ? { success: true, data }
      : { success: false }
  }

  const deleteMetadataById = async (id: string): Promise<MutationResult> => {
    const { error } = await deleteMetadata({ id })

    return { success: error === undefined }
  }

  const updateMetadataById = async (id: string, row: PredefinedAssetMetadataRow): Promise<MutationResult> => {
    const { error } = await updateMetadata({ id, updatePredefinedMetadata: toApiMetadata(row) })

    if (error !== undefined) {
      return { success: false, errorKey: getErrorKey(error) }
    }

    return { success: true }
  }

  return {
    createNewMetadata,
    createLoading,
    deleteMetadataById,
    deleteLoading,
    updateMetadataById,
    updateLoading
  }
}
