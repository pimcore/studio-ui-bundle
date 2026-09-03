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
import { setActiveBundles } from '@Pimcore/modules/app/settings/settings-slice'
import { api } from '@Pimcore/modules/app/settings/settings-slice.gen'

export interface UseActiveBundlesLoaderReturn {
  loadActiveBundles: () => Promise<void>
}

export const useActiveBundlesLoader = (): UseActiveBundlesLoaderReturn => {
  const dispatch = useAppDispatch()

  const loadActiveBundles = async (): Promise<void> => {
    const activeBundlesFetcher = dispatch(api.endpoints.activeBundlesGet.initiate())

    await activeBundlesFetcher
      .then(({ data, isSuccess, isError, error }) => {
        isError && trackError(new ApiError(error))

        if (isSuccess && data !== undefined) {
          dispatch(setActiveBundles(data.bundles.map((bundle) => bundle.name)))
        }
      })
      .catch(() => { })
  }

  return { loadActiveBundles }
}
