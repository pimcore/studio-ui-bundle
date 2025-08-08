import { Form } from "@Pimcore/components/form/form"
import { WindowModal } from "@Pimcore/components/modal/window-modal/window-modal"
import { App, FormInstance } from "antd"
import React, { createContext, useMemo, useState } from "react"
import { SendEmailParameters } from "../../emails-api-slice-enhanced"
import { SendTestMailForm } from "../component/send-test-mail-form/send-test-mail-form"
import { useSendTestMail } from "../hooks/use-send-test-mail"

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
  const [isOpen, setIsOpen] = useState(false)
  const { send } = useSendTestMail()
  const [tmpForm] = Form.useForm()

  const closeModal = (): void => {
    tmpForm.resetFields()
    setIsOpen(false)
  }

  const submit = async (): Promise<any> => {
    return await new Promise((resolve, reject) => {
      tmpForm!.validateFields()
        .then(async () => {
          const values = tmpForm!.getFieldsValue()

          console.log('submitted values: ', values)

          resolve(values)
          send(values)
          closeModal()
        })
        .catch(() => {
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
        size="L"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onOk={async () => {
          await submit()
        }}
      >
        <SendTestMailForm
          form={tmpForm}
          initalValues={{
            from: 'from@doe.com',
            to: 'to@doe.com',
            subject: 'Test Email Subject',
          }}
        />
      </WindowModal>

      {children}
    </SendTestEmailContext.Provider>
  )
}