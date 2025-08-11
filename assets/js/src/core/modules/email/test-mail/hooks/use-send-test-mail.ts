/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import ApiError from '@Pimcore/modules/app/error-handler/classes/api-error'
import GeneralError from '@Pimcore/modules/app/error-handler/classes/general-error'
import trackError from '@Pimcore/modules/app/error-handler/error-handler'
import { useFormModal } from '@sdk/components'
import { isUndefined } from 'lodash'
import { useTranslation } from 'react-i18next'
import { type SendEmailParameters, useEmailSendTestMutation } from '../../emails-api-slice-enhanced'

interface UseSendTestMailHookReturn {
  send: (parameters: SendEmailParameters, onFinish?: () => void) => Promise<void>
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
    } catch {
      trackError(new GeneralError(t('test-email.send.error')))
    }
  }

  return {
    send
  }
}
