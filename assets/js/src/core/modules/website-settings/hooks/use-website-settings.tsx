/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { type WebsiteSettingRow } from '../website-settings-container'
import { useWebsiteSettingsAddMutation, useWebsiteSettingsDeleteMutation, useWebsiteSettingsUpdateMutation, type WebsiteSetting, type WebsiteSettingsUpdate } from '../website-settings-api-slice-enhanced'
import { isUndefined } from 'lodash'

interface UseWebsiteSettingReturn {
  createNewSetting: (name: string, type: string) => Promise<{ success: boolean, data?: WebsiteSetting }>
  createLoading: boolean
  deleteSettingById: (id: number) => Promise<{ success: boolean }>
  deleteLoading: boolean
  updateSettingById: (id: number, row: WebsiteSettingRow) => Promise<{ success: boolean }>
  updateLoading: boolean
}

export const useWebsiteSetting = (): UseWebsiteSettingReturn => {
  const [createSetting, { isLoading: createLoading }] = useWebsiteSettingsAddMutation()
  const [deleteSetting, { isLoading: deleteLoading }] = useWebsiteSettingsDeleteMutation()
  const [updateSetting, { isLoading: updateLoading }] = useWebsiteSettingsUpdateMutation()

  const createNewSetting = async (name: string, type: string): Promise<{ success: boolean, data?: WebsiteSetting }> => {
    try {
      const result = await createSetting({ websiteSettingsAdd: { name, type } })

      if (!isUndefined(result.error)) {
        trackError(new ApiError(result.error))
      }

      if ('data' in result) {
        return { success: true, data: result.data }
      }
    } catch {
      trackError(new GeneralError('Error creating Website Settings'))
    }
    return { success: false }
  }

  const deleteSettingById = async (id: number): Promise<{ success: boolean }> => {
    try {
      const result = await deleteSetting({ id })

      if (!isUndefined(result.error)) {
        trackError(new ApiError(result.error))
      }

      return { success: 'data' in result }
    } catch {
      trackError(new GeneralError('Error deleting Website Settings'))
      return { success: false }
    }
  }

  const toApiSetting = (row: WebsiteSettingRow): WebsiteSettingsUpdate => ({
    name: row.name ?? '',
    language: row.language ?? '',
    data: row.data ?? '',
    siteId: row.siteId ?? 0
  })

  const updateSettingById = async (id: number, row: WebsiteSettingRow): Promise<{ success: boolean }> => {
    try {
      const result = await updateSetting({ id, websiteSettingsUpdate: toApiSetting(row) })

      if (!isUndefined(result.error)) {
        trackError(new ApiError(result.error))
      }

      return { success: 'data' in result }
    } catch {
      trackError(new GeneralError('Error updating Website Settings'))
      return { success: false }
    }
  }

  return {
    createNewSetting,
    createLoading,
    deleteSettingById,
    deleteLoading,
    updateSettingById,
    updateLoading
  }
}
