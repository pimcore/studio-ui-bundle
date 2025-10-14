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
import { type ApiErrorData } from '@Pimcore/modules/app/error-handler/classes/api-error'

interface UseAuthenticationReturn {
  resetPassword: (username: string, resetPasswordUrl?: string, onFinish?: () => void, onSuccess?: () => void) => Promise<void>
}

export const useAuthentication = (): UseAuthenticationReturn => {
  const [resetPasswordMutation] = useUserResetPasswordMutation()

  const resetPassword = async (username: string, resetPasswordUrl: string = '', onFinish?: () => void, onSuccess?: () => void): Promise<void> => {
    const resetPasswordTask = resetPasswordMutation({
      resetPassword: {
        username,
        resetPasswordUrl
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

  return {
    resetPassword
  }
}
