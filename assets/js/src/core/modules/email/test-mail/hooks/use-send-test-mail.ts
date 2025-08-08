import ApiError from "@Pimcore/modules/app/error-handler/classes/api-error"
import GeneralError from "@Pimcore/modules/app/error-handler/classes/general-error"
import trackError from "@Pimcore/modules/app/error-handler/error-handler"
import { isUndefined } from "lodash"
import { useTranslation } from "react-i18next"
import { SendEmailParameters, useEmailSendTestMutation } from "../../emails-api-slice-enhanced"
import { useMessage } from '@Pimcore/components/message/useMessage'
import { modalApi } from "@Pimcore/app/public-api/modal/modal-api"
import { useFormModal } from "@sdk/components"
import { useSendTestEmailContext } from "../provider/use-send-test-email-context"

interface UseSendTestMailHookReturn {
  send: (parameters: SendEmailParameters, onFinish?: () => void) => void
}

export const useSendTestMail = (): UseSendTestMailHookReturn => {
  const [sendTestMailMutation] = useEmailSendTestMutation()
  const { t } = useTranslation()
  const modal = useFormModal()

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

      modal.confirm({
        title: t('test-email.success.modal.title'),
        content: t('test-email.success.modal.text'),
        okText: t('yes'),
        cancelText: t('no'),
        onOk: () => {
          onFinish?.()
        }
      })
    } catch (error) {
      trackError(new GeneralError(t('test-email.send.error')))
    }
  }

  return {
    send
  }
}