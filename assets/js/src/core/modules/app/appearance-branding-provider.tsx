/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { useAppearanceBranding } from '@Pimcore/modules/appearance-branding/hooks/use-appearance-branding'
import { isUndefined } from 'lodash'

interface AppearanceBrandingProviderProps {
  children: React.ReactNode
}

const LOADING_BRANDING_COLOR = '#C5C0CC'

export const AppearanceBrandingProvider = ({ children }: AppearanceBrandingProviderProps): React.JSX.Element => {
  const { adminSettings, isSettingsLoading, isSettingsFetching } = useAppearanceBranding()

  useEffect(() => {
    const documentRoot = document.documentElement

    if (isSettingsLoading || isSettingsFetching) {
      documentRoot.style.setProperty('--pimcore-branding-color', LOADING_BRANDING_COLOR)
      documentRoot.style.setProperty('--pimcore-branding-color-background', LOADING_BRANDING_COLOR)
      return
    }

    if (isUndefined(adminSettings?.branding.brandColor)) {
      documentRoot.style.removeProperty('--pimcore-branding-color')
    } else {
      documentRoot.style.setProperty('--pimcore-branding-color', adminSettings?.branding.brandColor)
    }

    if (isUndefined(adminSettings?.branding.backgroundShade)) {
      documentRoot.style.removeProperty('--pimcore-branding-color-background')
    } else {
      documentRoot.style.setProperty('--pimcore-branding-color-background', adminSettings?.branding.backgroundShade)
    }
  }, [adminSettings, isSettingsLoading, isSettingsFetching])

  return <>{children}</>
}
