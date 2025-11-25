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
import { useLocation, useNavigate } from 'react-router-dom'
import { useIsAuthenticated } from './hooks/use-is-authenticated'
import { useStyle } from './login-page.styles'

export const LoginPage = (): React.JSX.Element => {
  const navigate = useNavigate()
  const location = useLocation()

  const user = useUser()
  const { isAuthenticated } = useIsAuthenticated()

  const { styles } = useStyle()

  useEffect(() => {
    if (isAuthenticated === true) {
      (async () => {
        const redirectPath: string = location?.state?.from?.pathname

        navigate(redirectPath ?? routes.root)

        await sendStatistics(user.isAdmin)
      })().catch(() => { })
    }
  }, [isAuthenticated])

  return (
    <div className={ styles.loginPage }>
      <div className={ styles.loginWidget }>
        <img
          alt={ 'Pimcore Logo' }
          src={ '/bundles/pimcorestudioui/img/logo.png' }
        />
        <LoginFormContainer />
      </div>
    </div>
  )
}
