/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSendTestMailModal } from './hooks/use-send-test-mail-modal'
import { useSendTestMail } from './hooks/use-send-test-mail'

export const SendTestEmailButton = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { sendTestMailModal } = useSendTestMailModal()
  const { send } = useSendTestMail()

  const handleClick = (): void => {
    sendTestMailModal({
      title: t('test-email.modal.title'),
      okText: t('test-email.modal.send'),
      formValues: {
        from: 'from@doe.com',
        to: 'to@doe.com',
        subject: 'Something Subject'
      },
      onOk: async (formData) => {
        console.log('submitted data (handleClick):', formData)
        send(formData)
      }
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
