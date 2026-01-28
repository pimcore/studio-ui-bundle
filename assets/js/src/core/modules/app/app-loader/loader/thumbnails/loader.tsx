/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useAppDispatch } from '@sdk/app'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { api } from '@Pimcore/modules/app/settings/settings-slice-enhanced'

export interface UseBrandThumbnailUrlLoaderReturn {
  loadBrandThumbnailUrls: () => Promise<void>
}

export const useBrandThumbnailUrlLoader = (): UseBrandThumbnailUrlLoaderReturn => {
  const dispatch = useAppDispatch()

  const loadBrandThumbnailUrls = async (): Promise<void> => {
    const thumbnailsFetcher = dispatch(api.endpoints.settingAdminThumbnail.initiate())

    thumbnailsFetcher
      .then(({ isError, error }) => {
        isError && trackError(new ApiError(error))
      })
      .catch(() => { })
  }

  return { loadBrandThumbnailUrls }
}
