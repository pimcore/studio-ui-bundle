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
  type QuantityValueUnit,
  type UpdateUnitParameters,
  useUnitQuantityValueUnitsCreateMutation,
  useUnitQuantityValueUnitsDeleteMutation,
  useUnitQuantityValueUnitsUpdateMutation
} from '@Pimcore/modules/data-object/unit-slice-enhanced'

export type QuantityValueUnitRow = QuantityValueUnit & { rowId: string }

interface UseQuantityValueUnitReturn {
  createUnit: (id: string) => Promise<{ success: boolean, data?: QuantityValueUnit }>
  createLoading: boolean
  deleteUnitById: (id: string) => Promise<{ success: boolean }>
  deleteLoading: boolean
  updateUnitById: (id: string, row: QuantityValueUnitRow) => Promise<{ success: boolean }>
  updateLoading: boolean
}

export const useQuantityValueUnit = (): UseQuantityValueUnitReturn => {
  const [createUnitMutation, { isLoading: createLoading }] = useUnitQuantityValueUnitsCreateMutation()
  const [deleteUnitMutation, { isLoading: deleteLoading }] = useUnitQuantityValueUnitsDeleteMutation()
  const [updateUnitMutation, { isLoading: updateLoading }] = useUnitQuantityValueUnitsUpdateMutation()

  const createUnit = async (id: string): Promise<{ success: boolean, data?: QuantityValueUnit }> => {
    try {
      const result = await createUnitMutation({ createUnitParameters: { id } })
      if ('data' in result) {
        return { success: true, data: result.data }
      }
    } catch {
      trackError(new GeneralError('Was not able to create Unit'))
    }
    return { success: false }
  }

  const deleteUnitById = async (id: string): Promise<{ success: boolean }> => {
    try {
      const result = await deleteUnitMutation({ id })
      return { success: 'data' in result }
    } catch {
      trackError(new GeneralError('Was not able to delete Unit'))
      return { success: false }
    }
  }

  const toApiUnit = (row: QuantityValueUnitRow): UpdateUnitParameters => ({
    abbreviation: row.abbreviation ?? null,
    longname: row.longName ?? null,
    baseunit: row.baseUnit ?? null,
    factor: row.factor ?? null,
    conversionOffset: row.conversionOffset ?? null,
    converter: row.converter ?? null,
    reference: row.reference ?? null
  })

  const updateUnitById = async (id: string, row: QuantityValueUnitRow): Promise<{ success: boolean }> => {
    try {
      const result = await updateUnitMutation({ id, updateUnitParameters: toApiUnit(row) })
      return { success: 'data' in result }
    } catch {
      trackError(new GeneralError('Was not able to update Unit'))
      return { success: false }
    }
  }

  return {
    createUnit,
    createLoading,
    deleteUnitById,
    deleteLoading,
    updateUnitById,
    updateLoading
  }
}
