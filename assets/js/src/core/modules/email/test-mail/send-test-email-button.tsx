/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useMessage } from '@Pimcore/components/message/useMessage'
import { useEmailSendTestMutation } from '@Pimcore/modules/email/emails-api-slice.gen'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { TestEmailFormValues } from './component/send-test-mail-form/send-test-mail-form'
import { useSendTestMail } from './hooks/use-send-test-mail'

export const SendTestEmailButton = (): React.JSX.Element => {
  const { t } = useTranslation()
  const [sendTestEmail] = useEmailSendTestMutation()
  const { success } = useMessage()
  const { sendTestMailModal } = useSendTestMail()

  const onFinish = async (values: TestEmailFormValues): Promise<void> => {
    console.log(values)
  }

  const handleClick = (): void => {
    sendTestMailModal({
      title: t('test-email.modal.title'),
      okText: t('test-email.modal.send'),
    })
  }

  return (
    <>
      <button
        className="main-nav__list-btn"
        onClick={handleClick}
      >
        {t('navigation.test-email')}
      </button>
    </>
  )
}
