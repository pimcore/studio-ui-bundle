import React from 'react'
import { LoginForm } from '@Pimcore/components/login-form/login-form'
import { useStyle } from '@Pimcore/router/layouts/login/login.styles'
import { useMiddleware } from '@Pimcore/components/login-form/hooks/use-middleware'

export default function LoginLayout (): React.JSX.Element {
  const { styles } = useStyle()

  useMiddleware()

  return (
    <>
      <div
        className={ styles.loginPage }
      >
        <div className={ styles.loginWidget }>
          <img
            alt={ 'Pimcore Logo' }
            src={ '/bundles/pimcorestudioui/img/logo.png' }
          />
          <LoginForm />
        </div>
      </div>
    </>
  )
}
