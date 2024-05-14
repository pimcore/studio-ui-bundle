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
