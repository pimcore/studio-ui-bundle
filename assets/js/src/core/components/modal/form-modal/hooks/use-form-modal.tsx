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

type ConfigUpdate = ModalFuncProps | ((prevConfig: ModalFuncProps) => ModalFuncProps)

export type InputFormModalProps = Omit<ModalFuncProps, 'content'> & {
  label?: string
  rule?: Rule
  initialValue?: string
}

export type TextareaFormModalProps = Omit<ModalFuncProps, 'content'> & {
  label?: string
  initialValue?: string
  placeholder?: string
}

interface UploadFormProps extends Omit<InputFormModalProps, 'initialValues'> {
  accept?: string
}

export interface UseFormModalHookResponse {
  input: (props: InputFormModalProps) => { destroy: () => void, update: (configUpdate: ConfigUpdate) => void }
  textarea: (props: TextareaFormModalProps) => { destroy: () => void, update: (configUpdate: ConfigUpdate) => void }
  confirm: (props: ModalFuncProps) => { destroy: () => void, update: (configUpdate: ConfigUpdate) => void }
  upload: (props: UploadFormProps) => { destroy: () => void, update: (configUpdate: ConfigUpdate) => void }
}

export function useFormModal (): UseFormModalHookResponse {
  const { modal } = App.useApp()

  const [tmpForm] = Form.useForm()
  form = tmpForm

  return React.useMemo<UseFormModalHookResponse>(
    () => ({
      input: (props) => {
        const modalResult = modal.confirm(withInput(props))
        // avoid that errors are logged in the console
        modalResult.then(() => {}, () => {})
        return modalResult
      },
      textarea: (props) => {
        const modalResult = modal.confirm(withTextarea(props))
        // avoid that errors are logged in the console
        modalResult.then(() => {}, () => {})
        return modalResult
      },
      confirm: (props) => modal.confirm(withConfirm(props)),
      upload: (props) => modal.confirm(withUpload(props))
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
            reject(new Error('Invalid form'))
          })
      })
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

interface TextareaFormProps {
  form: FormInstance<any>
  initialValues: object
  fieldName: string
  placeholder?: string
}

export function withTextarea (props: TextareaFormModalProps): ModalFuncProps {
  const textareaRef = React.createRef<InputRef>()
  const uuid = pimcoreUUid()
  const fieldName = `textarea-${uuid}`
  const {
    label,
    initialValue = '',
    ...modalProps
  } = props

  const TextareaForm = forwardRef(function InputForm (props: TextareaFormProps, ref: RefObject<InputRef>): React.JSX.Element {
    return (
      <Form
        form={ props.form }
        initialValues={ props.initialValues }
        layout={ 'vertical' }
      >
        <Form.Item
          label={ label }
          name={ props.fieldName }
        >
          <Input.TextArea
            autoSize={ { minRows: 10, maxRows: 20 } }
            placeholder={ props.placeholder }
            ref={ ref }
          />
        </Form.Item>
      </Form>
    )
  })

  return {
    ...modalProps,
    type: props.type ?? 'confirm',
    icon: props.icon ?? null,
    width: 700,
    onOk: async () => {
      const value = form!.getFieldValue(fieldName)
      props.onOk?.(value)
    },
    modalRender: (node) => {
      if (textareaRef.current !== null) {
        textareaRef.current.focus()
      }
      return node
    },
    content: <TextareaForm
      fieldName={ fieldName }
      form={ form! }
      initialValues={ { [fieldName]: initialValue } }
      key={ 'textarea-form' }
      placeholder={ props.placeholder }
      ref={ textareaRef }
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

export function withUpload (props: UploadFormProps): ModalFuncProps {
  const inputRef = React.createRef<InputRef>()
  const uuid = pimcoreUUid()
  const fieldName = `upload-${uuid}`
  const {
    label,
    rule,
    accept,
    ...modalProps
  } = props

  let formattedRule: Rule[] = []
  if (rule !== undefined) {
    formattedRule = [rule]
  }

  const UploadForm = forwardRef(function InputForm (props: InputFormProps, ref: RefObject<InputRef>): React.JSX.Element {
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
          <Input
            accept={ accept }
            ref={ ref }
            type="file"
          />
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
            const files = inputRef.current!.input!.files

            props.onOk?.(files)
            resolve(files)
          })
          .catch(() => {
            reject(new Error('Invalid form'))
          })
      })
    },
    content: <UploadForm
      fieldName={ fieldName }
      form={ form! }
      initialValues={ {} }
      key={ 'upload-form' }
      ref={ inputRef }
             />
  }
}
