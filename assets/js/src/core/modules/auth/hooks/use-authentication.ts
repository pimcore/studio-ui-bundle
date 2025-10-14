import trackError, { ApiError, GeneralError } from "@Pimcore/modules/app/error-handler"
import { useUserResetPasswordMutation } from "../user/user-api-slice.gen"

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
        trackError(new ApiError(response.error))
        onFinish?.()
        return
      }

      onFinish?.()
      onSuccess?.()
    } catch (error) {
      trackError(new GeneralError('Error resetting password'))
      onFinish?.()
    }
  }

  return {
    resetPassword
  }
}