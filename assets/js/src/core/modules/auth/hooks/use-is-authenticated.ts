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
import { useUserGetCurrentInformationQuery } from '../user/user-api-slice-enhanced'
import { useAppDispatch, useAppSelector } from '@Pimcore/app/store'
import { selectIsAuthenticated, setAuthState } from '../auth-slice'

export interface UseIsAuthenticatedReturn {
  isAuthenticated?: boolean
  recheck: () => void
}

export const useIsAuthenticated = (): UseIsAuthenticatedReturn => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const dispatch = useAppDispatch()
  const { isError, error, isSuccess, refetch } = useUserGetCurrentInformationQuery(undefined, { skip: isAuthenticated !== undefined })

  const recheck = (): void => {
    void refetch()
  }

  useEffect(() => {
    if (isError) {
      dispatch(setAuthState(false))
    }

    if (isSuccess) {
      dispatch(setAuthState(true))
    }
  }, [isError, isSuccess, error])

  return {
    isAuthenticated,
    recheck
  }
}
