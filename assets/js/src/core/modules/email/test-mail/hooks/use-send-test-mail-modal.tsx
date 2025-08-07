import { useStudioModal } from "@Pimcore/components/modal/hooks/use-studio-modal"
import React from "react"
import { SendTestMailForm } from "../component/send-test-mail-form/send-test-mail-form"
import { Form } from "@Pimcore/components/form/form"
import { FormInstance, ModalFuncProps } from "antd"
import { ConfigUpdate } from "@Pimcore/components/modal/form-modal/hooks/use-form-modal"
import { SendEmailParameters } from "../../emails-api-slice-enhanced"

let form: FormInstance<any> | null = null

interface SendTestMailModal extends Omit<ModalFuncProps, 'content'> {
  formValues?: Partial<SendEmailParameters>
  onOk?: (formData: SendEmailParameters) => Promise<void>
}

interface UseSendTestMailModalHookReturn {
  sendTestMailModal: (props: SendTestMailModal) => { destroy: () => void, update: (configUpdate: ConfigUpdate) => void }
}

export const useSendTestMailModal = (): UseSendTestMailModalHookReturn => {
  const { localModal } = useStudioModal()
  const [tmpForm] = Form.useForm()
  form = tmpForm

  return React.useMemo<UseSendTestMailModalHookReturn>(
    () => ({
      sendTestMailModal: (props: SendTestMailModal) => {
        const modalResult = localModal.confirm(withSendTestMailForm(props))
        modalResult.then(() => { }, () => { })

        return modalResult
      }
    }), []
  )
}

const withSendTestMailForm = (props: SendTestMailModal): ModalFuncProps => {
  const { formValues, ...modalProps } = props

  const submit = async (): Promise<any> => {
    return await new Promise((resolve, reject) => {
      form!.validateFields()
        .then(async () => {
          const values = form!.getFieldsValue()
          await props.onOk?.(values)
          resolve(values)
        })
        .catch(() => {
          console.log('error - invalid form')
          reject(new Error('Invalid form'))
        })
    })
  }

  return {
    ...modalProps,
    type: props.type ?? 'info',
    icon: props.icon ?? null,
    width: 700,
    cancelButtonProps: {
      disabled: props.cancelButtonProps?.disabled ?? false
    },
    onOk: async () => {
      await submit()
    },
    modalRender: (node) => {
      return node
    },
    content: <SendTestMailForm initalValues={formValues} form={form!} />
  }
}