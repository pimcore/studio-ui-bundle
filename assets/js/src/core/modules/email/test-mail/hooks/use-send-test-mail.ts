import ApiError from "@Pimcore/modules/app/error-handler/classes/api-error"
import GeneralError from "@Pimcore/modules/app/error-handler/classes/general-error"
import trackError from "@Pimcore/modules/app/error-handler/error-handler"
import { isUndefined } from "lodash"
import { useTranslation } from "react-i18next"
import { SendEmailParameters, useEmailSendTestMutation } from "../../emails-api-slice-enhanced"
import { useMessage } from '@Pimcore/components/message/useMessage'

interface UseSendTestMailHookReturn {
  send: (parameters: SendEmailParameters, onFinish?: () => void) => void
}

export const useSendTestMail = (): UseSendTestMailHookReturn => {
  const [sendTestMailMutation] = useEmailSendTestMutation()
  const { success } = useMessage()
  const { t } = useTranslation()

  const send = async (parameters: SendEmailParameters, onFinish?: () => void): Promise<void> => {
    const sendTestMailTask = sendTestMailMutation({
      sendEmailParameters: parameters
    })

    try {
      const response = await sendTestMailTask

      if (!isUndefined(response.error)) {
        trackError(new ApiError(response.error))
        return
      }

      onFinish?.()
      //void success(t('test-email.send.success'))
    } catch (error) {
      trackError(new GeneralError(t('test-email.send.error')))
    }
  }

  return {
    send
  }
}