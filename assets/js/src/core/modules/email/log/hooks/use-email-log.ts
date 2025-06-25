import { useTranslation } from "react-i18next"
import { Blocklist2, EmailLogDeleteApiArg, EmailLogForwardByIdApiArg, EmailLogResendByIdApiArg, useEmailLogDeleteMutation, useEmailLogForwardByIdMutation, useEmailLogResendByIdMutation } from "../../emails-api-slice.gen"
import { isUndefined } from "lodash"
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { useMessage } from "@Pimcore/components/message/useMessage"
import { useFormModal } from "@Pimcore/components/modal/form-modal/hooks/use-form-modal"

interface UseEmailLogHookReturn {
  resend: (id: EmailLogResendByIdApiArg['id'], onFinish?: () => void) => Promise<void>
  forward: (id: EmailLogForwardByIdApiArg['id'], to: Blocklist2['email'], onFinish?: () => void) => Promise<void>
  remove: (id: EmailLogDeleteApiArg['id'], onFinish?: () => void) => Promise<void>
}

export const useEmailLog = (): UseEmailLogHookReturn => {
  const modal = useFormModal()
  const { t } = useTranslation()
  const [resendMutation] = useEmailLogResendByIdMutation()
  const [forwardMutation] = useEmailLogForwardByIdMutation()
  const [deleteMutation] = useEmailLogDeleteMutation()
  const { success } = useMessage()

  const resend = async (id: EmailLogResendByIdApiArg['id'], onFinish?: () => void): Promise<void> => {
    const resendEmailTask = resendMutation({
      id
    })

    try {
      const response = await resendEmailTask

      if (!isUndefined(response.error)) {
        trackError(new ApiError(response.error))
      }

      onFinish?.()
      void success(t('email-log.resend.email.success'))
    } catch (error) {
      trackError(new GeneralError('Failed to resend email'))
    }
  }

  const forward = async (id: EmailLogForwardByIdApiArg['id'], to: Blocklist2['email'], onFinish?: () => void): Promise<void> => {
    const forwardEmailTask = forwardMutation({
      id,
      emailAddressParameter: {
        email: to
      }
    })

    try {
      const response = await forwardEmailTask

      if (!isUndefined(response.error)) {
        trackError(new ApiError(response.error))
      }

      onFinish?.()
      void success(t('email-log.forward.email.success'))
    } catch (error) {
      trackError(new GeneralError('Failed to forward email'))
    }
  }

  const remove = async (id: EmailLogDeleteApiArg['id'], onFinish?: () => void): Promise<void> => {
    const deleteEmailLogTask = deleteMutation({
      id
    })

    try {
      const response = await deleteEmailLogTask

      if (!isUndefined(response.error)) {
        trackError(new ApiError(response.error))
      }

      onFinish?.()
      void success(t('email-log.delete.email.success'))
    } catch (error) {
      trackError(new GeneralError('Failed to delete email'))
    }
  }

  return {
    resend,
    forward,
    remove
  }
}