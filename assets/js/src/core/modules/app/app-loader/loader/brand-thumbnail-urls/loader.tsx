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
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { api } from '@Pimcore/modules/app/settings/settings-slice.gen'
import { setThumbnails } from '@Pimcore/modules/app/settings/settings-slice'

export interface UseBrandThumbnailUrlLoaderReturn {
  loadBrandThumbnailUrls: () => Promise<void>
}

export const useBrandThumbnailUrlLoader = (): UseBrandThumbnailUrlLoaderReturn => {
  const dispatch = useAppDispatch()

  const loadBrandThumbnailUrls = async (): Promise<void> => {
    const thumbnailsFetcher = dispatch(api.endpoints.settingAdminThumbnail.initiate())

    await thumbnailsFetcher
      .then(({ data, isSuccess, isError, error }) => {
        if (isError) {
          trackError(new ApiError(error))
        } else if (isSuccess && data !== undefined) {
          dispatch(setThumbnails(data))
        }
      })
      .catch(() => {
        trackError(new GeneralError('Error loading brand thumbnail URLs'))
      })
  }

  return { loadBrandThumbnailUrls }
}
