/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { routes } from '@Pimcore/app/router/router'
import { useAppDispatch } from '@Pimcore/app/store'
import { setAuthState } from '@Pimcore/modules/auth/auth-slice'
import { useAuthentication } from '@Pimcore/modules/auth/hooks/use-authentication'
import { isNil } from 'lodash'
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const PasswordReset = (): React.JSX.Element => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token: string | null = searchParams.get('token')
  const { loginWithToken } = useAuthentication()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isNil(token)) {
      void loginWithToken(
        token,
        async () => {
          navigate(routes.root, { state: { resetPassword: true } })
          dispatch(setAuthState(true))
        },
        () => {
          navigate(routes.login)
        }
      )
    }
  }, [token])

  return <></>
}
