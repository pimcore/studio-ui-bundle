import { useRefreshToken } from '@Pimcore/components/login-form/hooks/use-refresh-token'
import { useIsAuthenticated } from '@Pimcore/components/login-form/hooks/use-is-authenticated'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const useMiddleware = (): void => {
  const isAuthenticated = useIsAuthenticated()
  const navigate = useNavigate()
  const { refreshToken } = useRefreshToken()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (isAuthenticated) {
      navigate('/admin/studio')
    }

    if (!isAuthenticated) {
      if (token === null) {
        navigate('/admin/studio/login')
      }

      if (token !== null) {
        void (async () => {
          await refreshToken({ token })
        })()
      }
    }
  }, [isAuthenticated])
}
