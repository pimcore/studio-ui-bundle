import { useStudioModal } from "@Pimcore/components/modal/hooks/use-studio-modal"
import React from "react"
import { SendTestMailForm, TestEmailFormValues } from "../component/send-test-mail-form/send-test-mail-form"
import { Form } from "@Pimcore/components/form/form"
import { FormInstance, ModalFuncProps } from "antd"
import { ConfigUpdate } from "@Pimcore/components/modal/form-modal/hooks/use-form-modal"

let form: FormInstance<any> | null = null

interface SendTestMailModal extends Omit<ModalFuncProps, 'content'> {
  formValues?: TestEmailFormValues
}

interface UseSendTestMailHookReturn {
  sendTestMailModal: (props: SendTestMailModal) => { destroy: () => void, update: (configUpdate: ConfigUpdate) => void }
}

export const useSendTestMail = (): UseSendTestMailHookReturn => {
  const { modal, localModal } = useStudioModal()
  const [tmpForm] = Form.useForm()
  form = tmpForm

  return React.useMemo<UseSendTestMailHookReturn>(
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
    //onSetModalLoading?.(true)
    return await new Promise((resolve, reject) => {
      form!.validateFields()
        .then(async () => {
          const values = form!.getFieldsValue()
          await props.onOk?.(values)
          //onKeyBoardSubmit?.(values)
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