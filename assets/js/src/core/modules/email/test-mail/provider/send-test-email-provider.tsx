/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Form } from '@Pimcore/components/form/form'
import { WindowModal } from '@Pimcore/components/modal/window-modal/window-modal'
import { type FormInstance } from 'antd'
import React, { createContext, useMemo, useState } from 'react'
import { type SendEmailParameters } from '../../emails-api-slice-enhanced'
import { SendTestMailForm } from '../component/send-test-mail-form/send-test-mail-form'
import { useSendTestMail } from '../hooks/use-send-test-mail'
import { useTranslation } from 'react-i18next'

interface SendTestEmailProviderProps {
  children: React.ReactNode
}

export interface SendTestEmailContextProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  closeModal: () => void
  form: FormInstance<SendEmailParameters>
}

export const SendTestEmailContext = createContext<SendTestEmailContextProps | undefined>(undefined)

export const SendTestEmailProvider: React.FC<SendTestEmailProviderProps> = ({ children }) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const { send } = useSendTestMail()
  const [tmpForm] = Form.useForm()
  const [isOkButtonLoading, setIsOkButtonLoading] = useState<boolean>(false)

  const closeModal = (): void => {
    tmpForm.resetFields()
    setIsOpen(false)
  }

  const submit = async (): Promise<any> => {
    return await new Promise((resolve, reject) => {
      tmpForm.validateFields()
        .then(async () => {
          setIsOkButtonLoading(true)
          const values = tmpForm.getFieldsValue() as SendEmailParameters

          resolve(values)
          void send(
            values,
            () => {
              closeModal()
              setIsOkButtonLoading(false)
            },
            () => {
              setIsOkButtonLoading(false)
            }
          )
        })
        .catch(() => {
          setIsOkButtonLoading(false)
          reject(new Error('Invalid form data'))
        })
    })
  }

  const contextValue = useMemo(() => ({
    isOpen,
    setIsOpen,
    form: tmpForm,
    closeModal
  }), [isOpen, tmpForm])

  return (
    <SendTestEmailContext.Provider value={contextValue}>
      <WindowModal
        onClose={() => { setIsOpen(false) }}
        onOk={async () => {
          await submit()
        }}
        title={t('test-email.modal.title')}
        open={isOpen}
        okButtonProps={{
          loading: isOkButtonLoading
        }}
        size="L"
      >
        <SendTestMailForm
          form={tmpForm}
          initalValues={{
            from: 'from@doe.com',
            to: 'to@doe.com',
            subject: 'Test Email Subject'
          }}
        />
      </WindowModal>

      {children}
    </SendTestEmailContext.Provider>
  )
}
