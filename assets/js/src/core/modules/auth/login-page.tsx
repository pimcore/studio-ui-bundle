/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { routes } from '@Pimcore/app/router/router'
import { LoginForm } from '@Pimcore/components/login-form/login-form'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useIsAuthenticated } from './hooks/use-is-authenticated'
import { useStyle } from './login-page.styles'

export const LoginPage = (): React.JSX.Element => {
  const { styles } = useStyle()
  const navigate = useNavigate()
  const location = useLocation()
  const isAuthenticated = useIsAuthenticated()

  useEffect(() => {
    if (isAuthenticated) {
      const redirectPath: string = location?.state?.from?.pathname

      navigate(redirectPath ?? routes.root)
    }
  }, [isAuthenticated])

  return (
    <div className={ styles.loginPage }>
      <div className={ styles.loginWidget }>
        <img
          alt={ 'Pimcore Logo' }
          src={ '/bundles/pimcorestudioui/img/logo.png' }
        />
        <LoginForm />
      </div>
    </div>
  )
}
