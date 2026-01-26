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
import { useAdminSettingsGetQuery } from '@Pimcore/modules/app/settings/settings-slice.gen'

interface AppearanceBrandingProviderProps {
  children: React.ReactNode
}

export const AppearanceBrandingProvider = ({ children }: AppearanceBrandingProviderProps): React.JSX.Element => {
  const { data: adminSettings, isLoading } = useAdminSettingsGetQuery()

  useEffect(() => {
    if (isLoading || !adminSettings?.branding) {
      return
    }

    const branding = adminSettings.branding
    const documentRoot = document.documentElement

    if (branding.brandColor) {
      documentRoot.style.setProperty('--pimcore-branding-color', branding.brandColor)
    } else {
      documentRoot.style.removeProperty('--pimcore-branding-color')
    }

    if (branding.backgroundShade) {
      documentRoot.style.setProperty('--pimcore-branding-color-background', branding.backgroundShade)
    } else {
      documentRoot.style.removeProperty('--pimcore-branding-color-background')
    }

  }, [adminSettings, isLoading])

  return <>{children}</>
}
