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
import { useSessionGetStatusQuery } from '../authorization-api-slice.gen'
import { useAppDispatch, useAppSelector } from '@sdk/app'
import { selectIsAuthenticated, selectTwoFactorChallenge, setAuthState, setTwoFactorChallenge } from '../auth-slice'
import { getTwoFactorChallenge, type TwoFactorChallenge } from './use-two-factor-authentication'

export interface UseIsAuthenticatedReturn {
  isAuthenticated?: boolean
  twoFactor?: TwoFactorChallenge
  recheck: () => void
}

export const useIsAuthenticated = (): UseIsAuthenticatedReturn => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const twoFactor = useAppSelector(selectTwoFactorChallenge)
  const dispatch = useAppDispatch()
  // The session status answers 200 without a session, so the login page shows no failed request. The
  // current-user route answers 401 there.
  const { isError, error, isSuccess, data, refetch } = useSessionGetStatusQuery(undefined, { skip: isAuthenticated !== undefined })

  const recheck = (): void => {
    void refetch()
  }

  useEffect(() => {
    if (isError) {
      dispatch(setTwoFactorChallenge(getTwoFactorChallenge(error !== undefined && 'data' in error ? error.data : undefined)))
      dispatch(setAuthState(false))
    }

    if (isSuccess) {
      // A login that waits for its code is no session yet; the status carries the step like the 401 does
      dispatch(setTwoFactorChallenge(data.authenticated ? undefined : getTwoFactorChallenge(data)))
      dispatch(setAuthState(data.authenticated))
    }
  }, [isError, isSuccess, error, data])

  return {
    isAuthenticated,
    twoFactor,
    recheck
  }
}
