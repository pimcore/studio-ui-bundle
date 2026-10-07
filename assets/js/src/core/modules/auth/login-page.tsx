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
import { isNil, isUndefined } from 'lodash'
import { useAuthentication } from './hooks/use-authentication'
import { useAppDispatch } from '@Pimcore/app/store'
import { setAuthState } from './auth-slice'
import { useAdminThumbnails } from '@Pimcore/modules/app/branding/hooks/use-admin-thumbnails'

export interface LoginPageProps {
  /**
   * Set when the route guard renders this screen at the guarded route's own URL instead
   * of at `routes.login`. There is nowhere to send the user on success then - they are
   * already on the page they asked for - and navigating away would take them off it. The
   * form reloads the document instead, and the guard renders the route's own content.
   */
  inPlace?: boolean
}

export const LoginPage = ({ inPlace = false }: LoginPageProps): React.JSX.Element => {
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
    // Rendered by the guard: the URL is already the target, and the guard swaps to the
    // route's own content as soon as the state flips, so there is nothing to navigate to.
    if (inPlace) {
      return
    }

    if (isAuthenticated === true) {
      (async () => {
        const from = location?.state?.from
        const redirectPath: string | undefined = from?.pathname

        // Preserve the original query string (e.g. the OAuth `authorization_id`)
        // so deep links that carry state survive the login round-trip.
        navigate(
          !isUndefined(redirectPath)
            ? { pathname: redirectPath, search: from?.search ?? '' }
            : routes.root
        )

        await sendStatistics(user.isAdmin)
      })().catch(() => { })
    }
  }, [isAuthenticated, inPlace])

  // Only the login route acts on a `token` in the address. A login link is issued for that
  // route, so honouring one anywhere else adds nothing a user can reach legitimately - and
  // this screen now stands in for every guarded route, whose address the browser keeps. A
  // link such as `/asset/1234?token=<attacker's>` would otherwise establish a session as
  // whoever the token names, on a page the victim believed was their own deep link.
  //
  // Not a behaviour change: redirecting to the login route used to drop the query string, so
  // a token never reached this screen from a guarded route in the first place.
  useEffect(() => {
    if (inPlace) {
      return
    }

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
  }, [token, inPlace])

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
