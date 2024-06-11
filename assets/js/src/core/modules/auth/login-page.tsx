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

import React from 'react'
import { LoginForm } from '@Pimcore/components/login-form/login-form'
import { useStyle } from './login-page.styles'
import { useMiddleware } from '@Pimcore/modules/auth/hooks/use-middleware'

export const LoginPage = (): React.JSX.Element => {
  const { styles } = useStyle()
  useMiddleware()

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
