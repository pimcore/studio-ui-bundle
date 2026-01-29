/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useSelector } from 'react-redux'
import { getThumbnails } from '@Pimcore/modules/app/settings/settings-slice'
import { isUndefined } from 'lodash'

interface AdminThumbnails {
  logoUrl: string
  customLogoSmall: string
  loginScreenCustomBackgroundImage: string
  isLoadingOrFetching: boolean
}

export const useAdminThumbnails = (): AdminThumbnails => {
  const thumbnailData = useSelector(getThumbnails)

  const isLoadingOrFetching = isUndefined(thumbnailData) || Object.keys(thumbnailData).length === 0

  return {
    logoUrl: thumbnailData?.customLogo ?? '/bundles/pimcorestudioui/img/logo-purple.svg',
    customLogoSmall: thumbnailData?.customLogoSmall ?? '/bundles/pimcorestudioui/img/logo-purple.svg',
    loginScreenCustomBackgroundImage: thumbnailData?.loginScreenCustomBackgroundImage ?? '/bundles/pimcorestudioui/img/login-bg.png',
    isLoadingOrFetching
  }
}
