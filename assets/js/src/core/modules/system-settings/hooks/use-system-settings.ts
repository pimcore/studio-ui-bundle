/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { ApiError, GeneralError, trackError } from '@sdk/modules/app'
import { useTranslation } from 'react-i18next'
import { useSettingsUpdateMutation } from '@Pimcore/modules/app/settings/settings-slice-enhanced'
import { type SettingsUpdateApiArg } from '@Pimcore/modules/app/settings/settings-slice.gen'
import { isUndefined, merge } from 'lodash'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { useAppDispatch } from '@sdk/app'
import { getSettings, setSettings } from '@Pimcore/modules/app/settings/settings-slice'
import { useSelector } from 'react-redux'

interface UseSystemSettingsHookReturn {
  updateSettings: (settings: SettingsUpdateApiArg['body'], onFinish?: () => void) => Promise<void>
}

export const useSystemSettings = (): UseSystemSettingsHookReturn => {
  const { t } = useTranslation()
  const [settingsUpdateMutation] = useSettingsUpdateMutation()
  const { success } = useMessage()
  const dispatch = useAppDispatch()
  const currentSettings = useSelector(getSettings)

  const updateSettings = async (settings: SettingsUpdateApiArg['body'], onFinish?: () => void): Promise<void> => {
    const updateSettingsTask = settingsUpdateMutation({
      body: settings
    })

    try {
      const response = await updateSettingsTask

      if (!isUndefined(response.error)) {
        trackError(new ApiError(response.error))
        return
      }

      dispatch(setSettings(merge({}, currentSettings, settings)))

      onFinish?.()
      void success(t('system-settings.update.success'))
    } catch {
      trackError(new GeneralError('Failed to update system settings'))
    }
  }

  return {
    updateSettings
  }
}
