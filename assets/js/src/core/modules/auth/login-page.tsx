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
import { LoginFormContainer } from '@Pimcore/modules/auth/components/login-form/login-form-container'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { sendStatistics } from '@Pimcore/modules/auth/services/statisticsService'
import React, { useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useIsAuthenticated } from './hooks/use-is-authenticated'
import { useStyle } from './login-page.styles'
import { isNil } from 'lodash'
import { useAuthentication } from './hooks/use-authentication'
import { useAppDispatch } from '@Pimcore/app/store'
import { setAuthState } from './auth-slice'
import { useAdminThumbnails } from '@Pimcore/modules/app/branding/hooks/use-admin-thumbnails'

export const LoginPage = (): React.JSX.Element => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const token: string | null = searchParams.get('token')
  const dispatch = useAppDispatch()

  const user = useUser()
  const { isAuthenticated } = useIsAuthenticated()
  const { loginWithToken } = useAuthentication()
  const { customLogoSmall, loginScreenCustomBackgroundImage } = useAdminThumbnails()
  const { styles } = useStyle({ backgroundImageUrl: loginScreenCustomBackgroundImage })

  useEffect(() => {
    if (isAuthenticated === true) {
      (async () => {
        const redirectPath: string = location?.state?.from?.pathname

        navigate(redirectPath ?? routes.root)

        await sendStatistics(user.isAdmin)
      })().catch(() => { })
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (!isNil(token)) {
      void loginWithToken(
        token,
        async () => {
          navigate(routes.root)
          dispatch(setAuthState(true))
        },
        () => {
          navigate(routes.login)
        }
      )
    }
  }, [token])

  return (
    <div
      className={ styles.loginPage }
      data-testid="login-page"
    >
      <div className={ styles.loginWidget }>
        <img
          alt={ 'Logo' }
          data-testid="login-page-logo"
          src={ customLogoSmall }
        />
        <LoginFormContainer />
      </div>
    </div>
  )
}
