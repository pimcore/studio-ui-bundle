/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useAppDispatch } from '@Pimcore/app/store'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { api } from '@Pimcore/modules/app/settings/settings-slice.gen'

export interface UseAdminSettingsLoaderReturn {
  loadAdminSettings: () => Promise<void>
}

export const useAdminSettingsLoader = (): UseAdminSettingsLoaderReturn => {
  const dispatch = useAppDispatch()

  const loadAdminSettings = async (): Promise<void> => {
    const adminSettingsFetcher = dispatch(api.endpoints.adminSettingsGet.initiate())

    adminSettingsFetcher
      .then(({ isError, error }) => {
        isError && trackError(new ApiError(error))
      })
      .catch(() => { })
  }

  return { loadAdminSettings }
}
