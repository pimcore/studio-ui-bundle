/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type SystemSettingsGetApiResponse } from '@Pimcore/modules/app/settings/settings-slice.gen'
import { useSelector } from 'react-redux'
import { getSettings } from '@Pimcore/modules/app/settings/settings-slice'
import { useMemo, useState } from 'react'
import { isPimcoreStudioApiAvailable, getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'
import { isInIframe } from '@Pimcore/utils/iframe'

/**
 * Hook to get system settings that works in both main app and iframe contexts
 */
export const useSettings = (): SystemSettingsGetApiResponse => {
  const localSettings = useSelector(getSettings)
  const [isIframe] = useState(() => isInIframe())

  const result = useMemo(() => {
    if (isIframe && isPimcoreStudioApiAvailable()) {
      try {
        const { settings } = getPimcoreStudioApi()
        const parentSettings = settings.getSettings()
        
        if (parentSettings && Object.keys(parentSettings).length > 0) {
          return parentSettings
        }
      } catch (error) {
        console.warn('[useSettings] Failed to get parent settings:', error)
      }
    }
    
    return localSettings
  }, [isIframe, localSettings])

  return result
}
