/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useMessage } from '@Pimcore/components/message/useMessage'
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { type ApiErrorData } from '@Pimcore/modules/app/error-handler/types'
import { 
  useAdminSettingsGetQuery, 
  useAdminSettingsUpdateMutation, 
  type UpdateAdminSettings,
  type AdminSettings 
} from '@Pimcore/modules/app/settings/settings-slice.gen'
import { useTranslation } from 'react-i18next'
import { isUndefined } from 'lodash'

interface UseAppearanceBrandingReturn {
  updateSettings: (settings: UpdateAdminSettings, onFinish?: () => void) => Promise<void>
  isLoading: boolean
  adminSettings: AdminSettings | undefined
  isSettingsLoading: boolean
  isError: boolean
}

export const useAppearanceBranding = (): UseAppearanceBrandingReturn => {
  const { t } = useTranslation()
  const { success } = useMessage()
  const [adminSettingsUpdateMutation, { isLoading: isUpdateLoading }] = useAdminSettingsUpdateMutation()
  const { 
    data: adminSettings, 
    isLoading: isSettingsLoading,
    isError 
  } = useAdminSettingsGetQuery()

  const updateSettings = async (settings: UpdateAdminSettings, onFinish?: () => void): Promise<void> => {
    const settingsUpdateTask = adminSettingsUpdateMutation({
      updateAdminSettings: settings
    })

    try {
      const response = await settingsUpdateTask

      if (!isUndefined(response.error)) {
        onFinish?.()
        trackError(new ApiError(response.error as ApiErrorData))
        return
      }

      onFinish?.()
      void success(t('appearance-branding.update.success'))
    } catch (error) {
      onFinish?.()
      trackError(new GeneralError('Failed to update appearance settings.'))
    }
  }

  const isLoading = isUpdateLoading

  return {
    updateSettings,
    isLoading,
    adminSettings,
    isSettingsLoading,
    isError
  }
}
