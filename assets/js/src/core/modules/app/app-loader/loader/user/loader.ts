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
import { setUser } from '@Pimcore/modules/auth/user/user-slice'
import { api } from '@Pimcore/modules/user/user-api-slice-enhanced'

export interface UseUserLoaderReturn {
  loadUser: () => Promise<void>
}

export const useUserLoader = (): UseUserLoaderReturn => {
  const dispatch = useAppDispatch()

  const loadUser = async (): Promise<void> => {
    const userFetcher = dispatch(api.endpoints.userGetCurrentInformation.initiate())

    await userFetcher
      .then(({ data, isSuccess, isError, error }) => {
        if (isError) {
          // Handle error appropriately
          trackError(new ApiError(error))
        } else if (isSuccess && data !== undefined) {
          // Dispatch action to set user information in the store
          dispatch(setUser(data))
        }
      })
      .catch((err) => {
        trackError(new GeneralError('Error loading user information'))
        throw new Error('Error loading user information', { cause: err })
      })
  }

  return { loadUser }
}
