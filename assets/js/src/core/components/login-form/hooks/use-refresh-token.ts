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

import { type IRefreshRequest, useRefreshMutation } from '@Pimcore/components/login-form/services/auth'
import { setCredentials } from '@Pimcore/app/auth/auth-slice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

interface IUseRefreshTokenReturn {
  refreshToken: ({ token }: IRefreshRequest) => Promise<void>
}

export const useRefreshToken = (): IUseRefreshTokenReturn => {
  const [refresh] = useRefreshMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const refreshToken = async function ({ token }: IRefreshRequest): Promise<void> {
    try {
      if (token !== null) {
        const refreshedToken = await refresh({ token }).unwrap()

        localStorage.setItem('username', refreshedToken.username)
        localStorage.setItem('token', refreshedToken.token)

        dispatch(setCredentials({
          user: {
            username: refreshedToken.username
          },
          token: refreshedToken.token
        }))
      }
    } catch (error) {
      navigate('/admin/studio/login')
    }
  }

  return { refreshToken }
}
