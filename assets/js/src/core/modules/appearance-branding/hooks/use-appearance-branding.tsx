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
import { type ApiErrorData } from '@Pimcore/modules/app/error-handler/types'
import {
  useAdminSettingsGetQuery,
  useAdminSettingsUpdateMutation,
  type UpdateAdminSettings,
  type AdminSettings
} from '@Pimcore/modules/app/settings/settings-slice.gen'
import { isUndefined } from 'lodash'
import { useEffect } from 'react'

interface UseAppearanceBrandingReturn {
  updateSettings: (settings: UpdateAdminSettings) => Promise<{ success: boolean }>
  isLoading: boolean
  adminSettings: AdminSettings | undefined
  isSettingsLoading: boolean
  isSettingsFetching: boolean
  isError: boolean
}

export const useAppearanceBranding = (): UseAppearanceBrandingReturn => {
  const [adminSettingsUpdateMutation, { isLoading: isUpdateLoading }] = useAdminSettingsUpdateMutation()

  const {
    data: adminSettings,
    isLoading: isSettingsLoading,
    isFetching: isSettingsFetching,
    isError,
    error
  } = useAdminSettingsGetQuery()

  useEffect(() => {
    if (!isUndefined(error)) {
      trackError(new ApiError(error))
    }
  }, [error])

  const updateSettings = async (settings: UpdateAdminSettings): Promise<{ success: boolean }> => {
    try {
      const response = await adminSettingsUpdateMutation({
        updateAdminSettings: settings
      })

      if (!isUndefined(response.error)) {
        trackError(new ApiError(response.error as ApiErrorData))
        return { success: false }
      }

      return { success: 'data' in response }
    } catch {
      trackError(new GeneralError('Failed to update appearance settings.'))
      return { success: false }
    }
  }

  const isLoading = isUpdateLoading

  return {
    updateSettings,
    isLoading,
    adminSettings,
    isSettingsLoading,
    isSettingsFetching,
    isError
  }
}
