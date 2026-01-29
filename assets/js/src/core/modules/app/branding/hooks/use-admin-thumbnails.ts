/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect } from 'react'
import { useSettingAdminThumbnailQuery } from '@Pimcore/modules/app/settings/settings-slice-enhanced'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { isUndefined } from 'lodash'

interface AdminThumbnails {
  logoUrl: string
  customLogoSmall: string
  loginScreenCustomBackgroundImage: string
  isLoadingOrFetching: boolean
}

export const useAdminThumbnails = (): AdminThumbnails => {
  const {
    data: thumbnailData,
    isLoading,
    isFetching,
    error
  } = useSettingAdminThumbnailQuery(undefined, {
    skip: false
  })

  useEffect(() => {
    if (!isUndefined(error)) {
      trackError(new ApiError(error))
    }
  }, [error])

  const isLoadingOrFetching = isLoading || isFetching

  return {
    logoUrl: thumbnailData?.customLogo ?? '/bundles/pimcorestudioui/img/logo-purple.svg',
    customLogoSmall: thumbnailData?.customLogoSmall ?? '/bundles/pimcorestudioui/img/logo-purple.svg',
    loginScreenCustomBackgroundImage: thumbnailData?.loginScreenCustomBackgroundImage ?? '/bundles/pimcorestudioui/img/login-bg.png',
    isLoadingOrFetching
  }
}
