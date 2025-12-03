/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { useUserResetPasswordMutation } from '../user/user-api-slice.gen'
import { type ApiErrorData } from '@Pimcore/modules/app/error-handler/types'
import { generatePath } from 'react-router-dom'
import { currentDomain, routes } from '@sdk/app'
import { useLoginTokenMutation } from '../authorization-api-slice.gen'

interface UseAuthenticationReturn {
  resetPassword: (username: string, onFinish?: () => void, onSuccess?: () => void) => Promise<void>
  loginWithToken: (token: string, onSuccess?: () => void, onError?: () => void) => Promise<void>
}

export const useAuthentication = (): UseAuthenticationReturn => {
  const [resetPasswordMutation] = useUserResetPasswordMutation()
  const [loginWithTokenMutation] = useLoginTokenMutation()

  const resetPassword = async (username: string, onFinish?: () => void, onSuccess?: () => void): Promise<void> => {
    const generateResetPasswordUrl = (): string => {
      const path = generatePath(routes.passwordReset)

      return `${currentDomain}${path}`
    }

    const resetPasswordTask = resetPasswordMutation({
      resetPassword: {
        username,
        resetPasswordUrl: generateResetPasswordUrl()
      }
    })

    try {
      const response = (await resetPasswordTask) as any

      if (response.error !== undefined) {
        trackError(new ApiError(response.error as ApiErrorData))
        onFinish?.()
        return
      }

      onFinish?.()
      onSuccess?.()
    } catch {
      trackError(new GeneralError('Error resetting password'))
      onFinish?.()
    }
  }

  const loginWithToken = async (token: string, onSuccess?: () => void, onError?: () => void): Promise<void> => {
    const tokenLoginTask = loginWithTokenMutation({
      authenticationToken: {
        token
      }
    })

    try {
      const response = (await tokenLoginTask) as any

      if (response.error !== undefined) {
        trackError(new ApiError(response.error as ApiErrorData))
        onError?.()
        return
      }

      onSuccess?.()
    } catch (error) {
      console.log('error', error)
      trackError(new GeneralError('Error using token for authorization'))
      onError?.()
    }
  }

  return {
    resetPassword,
    loginWithToken
  }
}
