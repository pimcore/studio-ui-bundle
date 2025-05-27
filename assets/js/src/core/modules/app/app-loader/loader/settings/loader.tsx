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
import { setSettings } from '@Pimcore/modules/app/settings/settings-slice'
import { api } from '@Pimcore/modules/app/settings/settings-slice.gen'

export interface UseSettingsLoaderReturn {
  loadSettings: () => Promise<void>
}

export const useSettingsLoader = (): UseSettingsLoaderReturn => {
  const dispatch = useAppDispatch()

  const loadSettings = async (): Promise<void> => {
    const settingsFetcher = dispatch(api.endpoints.systemSettingsGet.initiate())

    settingsFetcher
      .then(({ data, isSuccess, isError, error }) => {
        isError && trackError(new ApiError(error))

        if (isSuccess && data !== undefined) {
          dispatch(setSettings(data))
        }
      })
      .catch(() => { })
  }

  return { loadSettings }
}
