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
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { api } from '@Pimcore/modules/app/settings/settings-slice.gen'
import { setAdminSettings } from '@Pimcore/modules/app/settings/settings-slice'

export interface UseAdminSettingsLoaderReturn {
  loadAdminSettings: () => Promise<void>
}

export const useAdminSettingsLoader = (): UseAdminSettingsLoaderReturn => {
  const dispatch = useAppDispatch()

  const loadAdminSettings = async (): Promise<void> => {
    const adminSettingsFetcher = dispatch(api.endpoints.adminSettingsGet.initiate())

    await adminSettingsFetcher
      .then(({ data, isSuccess, isError, error }) => {
        if (isError) {
          trackError(new ApiError(error))
        } else if (isSuccess && data !== undefined) {
          dispatch(setAdminSettings(data))
        }
      })
      .catch(() => {
        trackError(new GeneralError('Error loading admin settings'))
      })
  }

  return { loadAdminSettings }
}
