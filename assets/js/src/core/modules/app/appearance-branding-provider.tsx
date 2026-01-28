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
import { useIsAuthenticated } from '@Pimcore/modules/auth/hooks/use-is-authenticated'
import { isUndefined, isEmpty } from 'lodash'

interface AppearanceBrandingProviderProps {
  children: React.ReactNode
}

const LOADING_BRANDING_COLOR = '#C5C0CC'

export const AppearanceBrandingProvider = ({ children }: AppearanceBrandingProviderProps): React.JSX.Element => {
  const { isAuthenticated } = useIsAuthenticated()
  const { adminSettings, isSettingsLoading, isSettingsFetching, isError } = useAppearanceBranding()

  useEffect(() => {
    const documentRoot = document.documentElement

    if (isAuthenticated === undefined) {
      return
    }

    if (isSettingsLoading || isSettingsFetching) {
      documentRoot.style.setProperty('--pimcore-branding-color', LOADING_BRANDING_COLOR)
      documentRoot.style.setProperty('--pimcore-branding-color-background', LOADING_BRANDING_COLOR)
      return
    }

    if (isError || isUndefined(adminSettings?.branding)) {
      documentRoot.style.removeProperty('--pimcore-branding-color')
      documentRoot.style.removeProperty('--pimcore-branding-color-background')
      return
    }

    const branding = adminSettings.branding

    if (isEmpty(branding.brandColor)) {
      documentRoot.style.removeProperty('--pimcore-branding-color')
    } else {
      documentRoot.style.setProperty('--pimcore-branding-color', branding.brandColor)
    }

    if (isEmpty(branding.backgroundShade)) {
      documentRoot.style.removeProperty('--pimcore-branding-color-background')
    } else {
      documentRoot.style.setProperty('--pimcore-branding-color-background', branding.backgroundShade)
    }
  }, [isAuthenticated, adminSettings, isSettingsLoading, isSettingsFetching, isError])

  return <>{children}</>
}
