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
  createNewProperty: () => Promise<PredefinedProperty| undefined>
  createLoading: boolean
  deletePropertyById: (id: string) => Promise<unknown>
  deleteLoading: boolean
  updatePropertyById: (id: string, row: PredefinedPropertyRow) => Promise<unknown>
  updateLoading: boolean
}

export const usePredefinedProperty = (): UsePredefinedPropertiyReturn => {
  const [createProperty, {
    isLoading: createLoading
  }] = usePropertyCreateMutation()

  const createNewProperty = async (): Promise<PredefinedProperty | undefined> => {
  try {
    const result = await createProperty() 
    if ('data' in result) {
      return result.data
    }
  } catch (e) {
    trackError(new ApiError(e))
  }
  return undefined
}

  const [deleteProperty, {
    isLoading: deleteLoading
  }] = usePropertyDeleteMutation()

const deletePropertyById = async (id: string): Promise<boolean> => {
  try {
    const result = await deleteProperty({ id })
    return 'data' in result
  } catch (e) {
    trackError(new ApiError(e))
    return false
  }
}

  const [updateProperty, {
    isLoading: updateLoading
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
    
const updatePropertyById = async (id: string, row: PredefinedPropertyRow): Promise<boolean> => {
  const updatePredefinedProperty = toApiProperty(row)
  try {
    const result = await updateProperty({ id, updatePredefinedProperty })
    return 'data' in result
  } catch (e) {
    trackError(new ApiError(e))
    return false
  }
}

  return { createNewProperty, createLoading, deletePropertyById, deleteLoading, updatePropertyById, updateLoading }
}
