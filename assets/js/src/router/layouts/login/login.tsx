import React, { useEffect } from 'react'
import { LoginForm } from '@Pimcore/components/login-form/login-form'
import { useNavigate } from 'react-router-dom'
import { useIsAuthenticated } from '@Pimcore/components/login-form/hooks/use-is-authenticated'
import { useStyle } from '@Pimcore/router/layouts/login/login.styles'
import { useRefreshToken } from '@Pimcore/components/login-form/hooks/use-refresh-token'

export default function LoginLayout (): React.JSX.Element {
  const isAuthenticated = useIsAuthenticated()
  const navigate = useNavigate()
  const { styles } = useStyle()
  const { refreshToken } = useRefreshToken()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!isAuthenticated && token !== null) {
      void (async (): Promise<void> => {
        await refreshToken({ token })
      })()
    }

    if (isAuthenticated) {
      navigate('/admin/studio')
    }
  }, [isAuthenticated])

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
