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
import { type InputRef, type ModalFuncProps } from 'antd'
import { uuid as pimcoreUUid } from '@Pimcore/utils/uuid'
import { type Rule } from 'antd/lib/form'
import i18n from 'i18next'
import { Form, type formInstanceType } from '@Pimcore/components/form/form'
import { useStudioModal } from '@Pimcore/components/modal/hooks/use-studio-modal'
import { isDontAskAgainEnabled, setDontAskAgain } from '@Pimcore/utils/local-storage'
import { DontAskAgainSwitch } from '@Pimcore/components/modal/form-modal/components/dont-ask-again-switch'
import { TextareaForm } from '@Pimcore/components/modal/form-modal/components/textarea-form'
import { InputForm } from '@Pimcore/components/modal/form-modal/components/input-form'
import { UploadForm } from '@Pimcore/components/modal/form-modal/components/upload-form'
import { noop } from 'lodash'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'
import { Flex } from '@sdk/components'
import { createModalButtonTestId } from '@Pimcore/utils/test-id-generator'

let form: formInstanceType | null = null

function getFormModalButtonProps (props: ModalFuncProps): Pick<ModalFuncProps, 'okButtonProps' | 'cancelButtonProps'> {
  return {
    okButtonProps: {
      'data-testid': createModalButtonTestId('ok', 'form'),
      ...props.okButtonProps
    },
    cancelButtonProps: {
      'data-testid': createModalButtonTestId('cancel', 'form'),
      ...props.cancelButtonProps
    }
  }
}

export type ConfigUpdate = ModalFuncProps | ((prevConfig: ModalFuncProps) => ModalFuncProps)

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

interface UploadFormModalProps extends Omit<InputFormModalProps, 'initialValues'> {
  accept?: string
}

export type ConfirmFormModalProps = ModalFuncProps & {
  dontAskAgainKey?: string
}

export interface UseFormModalHookResponse {
  input: (props: InputFormModalProps) => { destroy: () => void, update: (configUpdate: ConfigUpdate) => void }
  textarea: (props: TextareaFormModalProps) => { destroy: () => void, update: (configUpdate: ConfigUpdate) => void }
  confirm: (props: ConfirmFormModalProps) => { destroy: () => void, update: (configUpdate: ConfigUpdate) => void }
  upload: (props: UploadFormModalProps) => { destroy: () => void, update: (configUpdate: ConfigUpdate) => void }
}

export function useFormModal (): UseFormModalHookResponse {
  const { modal, localModal } = useStudioModal()

  const [tmpForm] = Form.useForm()
  form = tmpForm

  const dontAskAgainRef = React.useRef<boolean>(false)

  return React.useMemo<UseFormModalHookResponse>(
    () => ({
      input: (props) => {
        const modalResult = localModal.confirm(withInput(props, (value) => { modalResult.destroy() }, (loading) => { modalResult.update({ okButtonProps: { loading } }) }))
        modalResult.then(() => { }, () => { })
        return modalResult
      },
      textarea: (props) => {
        const modalResult = localModal.confirm(withTextarea(props))
        modalResult.then(() => { }, () => { })
        return modalResult
      },
      confirm: (props) => {
        if (isNonEmptyString(props.dontAskAgainKey) && isDontAskAgainEnabled(props.dontAskAgainKey)) {
          props.onOk?.()
          return { destroy: noop, update: noop }
        }

        dontAskAgainRef.current = false

        return modal.confirm(withConfirm(props, dontAskAgainRef))
      },
      upload: (props) => localModal.confirm(withUpload(props))
    }),
    [modal, localModal]
  )
}

export function withInput (props: InputFormModalProps, onKeyBoardSubmit, onSetModalLoading): ModalFuncProps {
  const inputRef = React.createRef<InputRef>()
  const uuid = pimcoreUUid()
  const fieldName = `input-${uuid}`
  // Capture form instance at creation time to avoid
  // the module-level variable being overwritten by
  // other components that call useFormModal()
  const currentForm = form!
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

  const submit = async (fieldName): Promise<any> => {
    onSetModalLoading?.(true)
    return await new Promise((resolve, reject) => {
      currentForm.validateFields()
        .then(async () => {
          const value = currentForm.getFieldValue(fieldName)
          await props.onOk?.(value)
          onKeyBoardSubmit?.(value)
          resolve(value)
        })
        .catch(() => {
          reject(new Error('Invalid form'))
          onSetModalLoading?.(false)
        })
    })
  }

  return {
    ...modalProps,
    type: props.type ?? 'confirm',
    icon: props.icon ?? null,
    ...getFormModalButtonProps(props),
    onOk: async () => {
      await submit(fieldName)
    },
    modalRender: (node) => {
      if (inputRef.current !== null) {
        inputRef.current.focus()
      }
      return node
    },
    content: <InputForm
      fieldName={ fieldName }
      form={ currentForm }
      initialValues={ { [fieldName]: initialValue } }
      key={ 'input-form' }
      label={ label }
      onSubmitCapture={ async () => { await submit(fieldName) } }
      ref={ inputRef }
      rules={ formattedRule }
             />
  }
}

export function withTextarea (props: TextareaFormModalProps): ModalFuncProps {
  const textareaRef = React.createRef<InputRef>()
  const uuid = pimcoreUUid()
  const fieldName = `textarea-${uuid}`
  const currentForm = form!
  const {
    label,
    initialValue = '',
    ...modalProps
  } = props

  return {
    ...modalProps,
    type: props.type ?? 'confirm',
    icon: props.icon ?? null,
    width: 700,
    ...getFormModalButtonProps(props),
    onOk: async () => {
      const value = currentForm.getFieldValue(fieldName)
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
      form={ currentForm }
      initialValues={ { [fieldName]: initialValue } }
      key={ 'textarea-form' }
      label={ label }
      placeholder={ props.placeholder }
      ref={ textareaRef }
             />
  }
}

export function withConfirm (props: ConfirmFormModalProps, dontAskAgainRef: React.MutableRefObject<boolean>): ModalFuncProps {
  const { dontAskAgainKey, ...modalProps } = props

  const baseModalConfig = {
    ...modalProps,
    type: props.type ?? 'confirm',
    okText: props.okText ?? i18n.t('yes'),
    cancelText: props.cancelText ?? i18n.t('no'),
    ...getFormModalButtonProps(props)
  }

  if (!isNonEmptyString(dontAskAgainKey)) {
    return baseModalConfig
  }

  const handleOk = async (): Promise<void> => {
    if (dontAskAgainRef.current) {
      setDontAskAgain(dontAskAgainKey, true)
    }
    return props.onOk?.()
  }

  return {
    ...baseModalConfig,
    onOk: handleOk,
    footer: (originNode: React.ReactNode) => {
      return (
        <Flex
          align="center"
          justify="space-between"
        >
          <DontAskAgainSwitch dontAskAgainRef={ dontAskAgainRef } />
          <div>{originNode}</div>
        </Flex>
      )
    }
  }
}

export function withUpload (props: UploadFormModalProps): ModalFuncProps {
  const inputRef = React.createRef<InputRef>()
  const uuid = pimcoreUUid()
  const fieldName = `upload-${uuid}`
  const currentForm = form!
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

  return {
    ...modalProps,
    type: props.type ?? 'confirm',
    icon: props.icon ?? null,
    ...getFormModalButtonProps(props),
    onOk: async () => {
      return await new Promise((resolve, reject) => {
        currentForm.validateFields()
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
      accept={ accept }
      fieldName={ fieldName }
      form={ currentForm }
      initialValues={ {} }
      key={ 'upload-form' }
      label={ label }
      ref={ inputRef }
      rules={ formattedRule }
             />
  }
}
