import { useMessage } from "@Pimcore/components/message/useMessage"
import { useUserResetPasswordMutation } from "../user/user-api-slice.gen"

interface UseAuthenticationReturn {
  resetPassword: (username: string, resetPasswordUrl?: string, onFinish?: () => void) => Promise<void>
}

export const useAuthentication = (): UseAuthenticationReturn => {
  const [resetPasswordMutation] = useUserResetPasswordMutation()
  const { success } = useMessage()

  const resetPassword = async (username: string, resetPasswordUrl: string = '', onFinish?: () => void): Promise<void> => {
    const resetPasswordTask = resetPasswordMutation({
      resetPassword: {
        username,
        resetPasswordUrl
      }
    })

    try {
      const response = (await resetPasswordTask) as any

      if (response.error !== undefined) {
        throw new Error(response.error.data.error as string)
      }

      success('Password reset link has been sent to your email address.')

      onFinish?.()
    } catch (error) {
      console.error('Error resetting password', error)
    }
  }

  return {
    resetPassword
  }
}