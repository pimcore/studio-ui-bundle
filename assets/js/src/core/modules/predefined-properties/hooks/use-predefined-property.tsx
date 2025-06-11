/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { usePropertyCreateMutation, usePropertyDeleteMutation } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice-enhanced'
import { useEffect } from 'react'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { PredefinedProperty, type UpdatePredefinedProperty, usePropertyUpdateMutation } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice.gen'

export type PredefinedPropertyRow = PredefinedProperty & { rowId: string }
interface UsePredefinedPropertiyReturn {
  createProperty: () => Promise<unknown>
  createLoading: boolean
  deletePropertyById: (id: string) => Promise<unknown>
  deleteLoading: boolean
  updatePropertyById: (id: string, row: PredefinedPropertyRow) => Promise<unknown>
  updateLoading: boolean
}

export const usePredefinedProperty = (): UsePredefinedPropertiyReturn => {
  const [createProperty, {
    isLoading: createLoading,
    isError: isCreateError,
    error: createError
  }] = usePropertyCreateMutation()

  const [deleteProperty, {
    isLoading: deleteLoading,
    isError: isDeleteError,
    error: deleteError
  }] = usePropertyDeleteMutation()

  const deletePropertyById = async (id: string): Promise<void> => {
    await deleteProperty({ id })
  }
  const [updateProperty, {
    isLoading: updateLoading,
    isError: isUpdateError,
    error: updateError
  }] = usePropertyUpdateMutation()

    const toApiProperty = (row: PredefinedPropertyRow): UpdatePredefinedProperty => ({
      name: row.name ?? '',
      description: row.description ?? '',
      key: row.key ?? '',
      type: row.type ?? '',
      data: row.data ?? '',
      config: row.config ?? '',
      ctype: row.ctype ?? '',
      inheritable: row.inheritable
    })
    
  const updatePropertyById = async (id: string, row: PredefinedPropertyRow): Promise<void> => {
const updatePredefinedProperty = toApiProperty(row)
    await updateProperty({ id, updatePredefinedProperty })
  }

  useEffect(() => {
    if (isDeleteError) {
      trackError(new ApiError(deleteError))
    }
  }, [isDeleteError])

  useEffect(() => {
    if (isUpdateError) {
      trackError(new ApiError(updateError))
    }
  }, [isUpdateError])

  useEffect(() => {
    if (isCreateError) {
      trackError(new ApiError(createError))
    }
  }, [isCreateError])

  return { createProperty, createLoading, deletePropertyById, deleteLoading, updatePropertyById, updateLoading }
}
