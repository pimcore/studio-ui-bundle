/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import {
  type PredefinedProperty,
  type UpdatePredefinedProperty,
  usePropertyCreateMutation,
  usePropertyDeleteMutation,
  usePropertyUpdateMutation
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice.gen'

export type PredefinedPropertyRow = PredefinedProperty & { rowId: string }

interface UsePredefinedPropertyReturn {
  createNewProperty: () => Promise<{ success: boolean, data?: PredefinedProperty }>
  createLoading: boolean
  deletePropertyById: (id: string) => Promise<{ success: boolean }>
  deleteLoading: boolean
  updatePropertyById: (id: string, row: PredefinedPropertyRow) => Promise<{ success: boolean }>
  updateLoading: boolean
}

export const usePredefinedProperty = (): UsePredefinedPropertyReturn => {
  const [createProperty, { isLoading: createLoading }] = usePropertyCreateMutation()
  const [deleteProperty, { isLoading: deleteLoading }] = usePropertyDeleteMutation()
  const [updateProperty, { isLoading: updateLoading }] = usePropertyUpdateMutation()

  const createNewProperty = async (): Promise<{ success: boolean, data?: PredefinedProperty }> => {
    try {
      const result = await createProperty()
      if ('data' in result) {
        return { success: true, data: result.data }
      }
    } catch (e) {
      trackError(new GeneralError('Was not able to create Property'))
    }
    return { success: false }
  }

  const deletePropertyById = async (id: string): Promise<{ success: boolean }> => {
    try {
      const result = await deleteProperty({ id })
      return { success: 'data' in result }
    } catch (e) {
      trackError(new GeneralError('Was not able to delete Property'))
      return { success: false }
    }
  }

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

  const updatePropertyById = async (id: string, row: PredefinedPropertyRow): Promise<{ success: boolean }> => {
    try {
      const result = await updateProperty({ id, updatePredefinedProperty: toApiProperty(row) })
      return { success: 'data' in result }
    } catch (e) {
      trackError(new GeneralError('Was not able to update Property'))
      return { success: false }
    }
  }

  return {
    createNewProperty,
    createLoading,
    deletePropertyById,
    deleteLoading,
    updatePropertyById,
    updateLoading
  }
}
