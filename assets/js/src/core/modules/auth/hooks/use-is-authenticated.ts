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
import { useUserGetCurrentInformationQuery } from '../user/user-api-slice-enhanced'
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
  const skip = isAuthenticated !== undefined
  // The session status answers 200 without a session, so the login page shows no failed request. The
  // current-user route answers 401 there.
  const session = useSessionGetStatusQuery(undefined, { skip })
  // A backend from before the session route answers 404 (with or without a session): ask it the old way
  const sessionRouteMissing = session.isError && 'status' in session.error && session.error.status === 404
  const currentUser = useUserGetCurrentInformationQuery(undefined, { skip: skip || !sessionRouteMissing })
  const answer = sessionRouteMissing ? currentUser : session

  const recheck = (): void => {
    void answer.refetch()
  }

  useEffect(() => {
    if (answer.isError) {
      dispatch(setTwoFactorChallenge(getTwoFactorChallenge('data' in answer.error ? answer.error.data : undefined)))
      dispatch(setAuthState(false))
    }
  }, [answer.isError, answer.error])

  useEffect(() => {
    if (currentUser.isSuccess) {
      dispatch(setAuthState(true))
    }
  }, [currentUser.isSuccess])

  useEffect(() => {
    if (session.isSuccess) {
      // A login that waits for its code is no session yet; the status carries the step like the 401 does
      dispatch(setTwoFactorChallenge(session.data.authenticated ? undefined : getTwoFactorChallenge(session.data)))
      dispatch(setAuthState(session.data.authenticated))
    }
  }, [session.isSuccess, session.data])

  return {
    isAuthenticated,
    twoFactor,
    recheck
  }
}
