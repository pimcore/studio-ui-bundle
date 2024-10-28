/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React, { forwardRef, type RefObject } from 'react'
import { App, type FormInstance, Input, type InputRef, type ModalFuncProps } from 'antd'
import { uuid as pimcoreUUid } from '@Pimcore/utils/uuid'
import { type Rule } from 'antd/lib/form'
import i18n from 'i18next'
import { Form } from '@Pimcore/components/form/form'

let form: FormInstance<any> | null = null

export interface ExtModalFuncProps extends ModalFuncProps {
  beforeOk?: () => Promise<any>
  afterOpen?: () => void
}

type ConfigUpdate = ModalFuncProps | ((prevConfig: ModalFuncProps) => ModalFuncProps)

export type InputFormModalProps = Omit<ModalFuncProps, 'content'> & {
  label?: string
  rule?: Rule
  initialValue?: string
}

export interface UseFormModalHookResponse {
  input: (props: InputFormModalProps) => { destroy: () => void, update: (configUpdate: ConfigUpdate) => void }
  confirm: (props: ModalFuncProps) => { destroy: () => void, update: (configUpdate: ConfigUpdate) => void }
}

export function useFormModal (): UseFormModalHookResponse {
  const { modal } = App.useApp()

  const [tmpForm] = Form.useForm()
  form = tmpForm

  return React.useMemo<UseFormModalHookResponse>(
    () => ({
      input: (props) => modal.confirm(withInput(props)),
      confirm: (props) => modal.confirm(withConfirm(props))
    }),
    []
  )
}

interface InputFormProps {
  form: FormInstance<any>
  initialValues: object
  fieldName: string
}

export function withInput (props: InputFormModalProps): ModalFuncProps {
  const inputRef = React.createRef<InputRef>()
  const uuid = pimcoreUUid()
  const fieldName = `input-${uuid}`
  const {
    label,
    rule,
    initialValue = '',
    ...modalProps
  } = props

  let formattedRule: Rule[] = []
  if (rule !== undefined) {
    formattedRule = [rule]
  }

  const InputForm = forwardRef(function InputForm (props: InputFormProps, ref: RefObject<InputRef>): React.JSX.Element {
    return (
      <Form
        form={ props.form }
        initialValues={ props.initialValues }
        layout={ 'vertical' }
      >
        <Form.Item
          label={ label }
          name={ props.fieldName }
          rules={ formattedRule }
        >
          <Input ref={ ref } />
        </Form.Item>
      </Form>
    )
  })

  return {
    ...modalProps,
    type: props.type ?? 'confirm',
    icon: props.icon ?? null,
    onOk: async () => {
      return await new Promise((resolve, reject) => {
        form!.validateFields()
          .then(() => {
            const value = form!.getFieldValue(fieldName)
            props.onOk?.(value)
            resolve(value)
          })
          .catch(() => {
            reject(new Error('Form validation failed'))
          })
      })
      // props.onOk?.(value)
    },
    modalRender: (node) => {
      if (inputRef.current !== null) {
        inputRef.current.focus()
      }
      return node
    },
    content: <InputForm
      fieldName={ fieldName }
      form={ form! }
      initialValues={ { [fieldName]: initialValue } }
      key={ 'input-form' }
      ref={ inputRef }
             />
  }
}

export function withConfirm (props: ModalFuncProps): ModalFuncProps {
  return {
    ...props,
    type: props.type ?? 'confirm',
    okText: props.okText ?? i18n.t('yes'),
    cancelText: props.cancelText ?? i18n.t('no')
  }
}
