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

import React from 'react'
import { Form, type FormInstance, Input, type ModalFuncProps } from 'antd'
import { uuid as pimcoreUUid } from '@Pimcore/utils/uuid'
import { type HookModalRef } from 'antd/es/modal/useModal/HookModal'
import { type ModalFuncWithPromise } from 'antd/es/modal/useModal'
import usePatchElement from 'antd/es/_util/hooks/usePatchElement'
import HookModal from '@Pimcore/components/modal/form-modal/component/hook-modal/hook-modal'
import { type Rule } from 'antd/lib/form'
import i18n from 'i18next'

let uuid = pimcoreUUid()

interface ElementsHolderRef {
  patchElement: ReturnType<typeof usePatchElement>[1]
}

export interface ExtModalFuncProps extends ModalFuncProps {
  beforeOk?: () => Promise<any>
}

type ConfigUpdate = ModalFuncProps | ((prevConfig: ModalFuncProps) => ModalFuncProps)

export type InputFormModalProps = Omit<ModalFuncProps, 'content'> & {
  label?: string
  rule?: Rule
  initialValue?: string
}

export interface ExtHookApi {
  input: (props: InputFormModalProps) => { destroy: () => void, update: (configUpdate: ConfigUpdate) => void }
  confirm: (props: ModalFuncProps) => { destroy: () => void, update: (configUpdate: ConfigUpdate) => void }
}

const ElementsHolder = React.memo(
  React.forwardRef<ElementsHolderRef>((_props, ref) => {
    const [elements, patchElement] = usePatchElement()
    React.useImperativeHandle(
      ref,
      () => ({
        patchElement
      }),
      []
    )
    return <>{elements}</>
  })
)

const destroyFns: Array<() => void> = []

export function useFormModal (): readonly [instance: ExtHookApi, contextHolder: React.ReactElement] {
  const holderRef = React.useRef<ElementsHolderRef>(null)

  // ========================== Effect ==========================
  const [actionQueue, setActionQueue] = React.useState<Array<() => void>>([])

  React.useEffect(() => {
    if (actionQueue.length > 0) {
      const cloneQueue = [...actionQueue]
      cloneQueue.forEach((action) => {
        action()
      })

      setActionQueue([])
    }
  }, [actionQueue])

  // =========================== Hook ===========================
  const getConfirmFunc = React.useCallback(
    (withFunc: (config: ExtModalFuncProps) => ExtModalFuncProps) =>
      function hookConfirm (config: ExtModalFuncProps) {
        uuid += 1

        const modalRef = React.createRef<HookModalRef>()

        // Proxy to promise with `onClose`
        let resolvePromise: (confirmed: boolean) => void
        const promise = new Promise<boolean>((resolve) => {
          resolvePromise = resolve
        })
        let silent = false

        // eslint-disable-next-line prefer-const
        let closeFunc: (() => void) | undefined
        const modal = (
          <HookModal
            afterClose={ () => {
              closeFunc?.()
            } }
            config={ withFunc(config) }
            isSilent={ () => silent }
            key={ `modal-${uuid}` }
            onConfirm={ (confirmed) => {
              resolvePromise(confirmed)
            } }
            ref={ modalRef }
          />
        )

        // @ts-expect-error like ant-design
        closeFunc = holderRef.current?.patchElement(modal)

        if (closeFunc !== undefined) {
          destroyFns.push(closeFunc)
        }

        const instance: ReturnType<ModalFuncWithPromise> = {
          destroy: () => {
            function destroyAction (): void {
              modalRef.current?.destroy()
            }

            if (modalRef.current !== undefined) {
              destroyAction()
            } else {
              setActionQueue((prev) => [...prev, destroyAction])
            }
          },
          update: (newConfig) => {
            function updateAction (): void {
              modalRef.current?.update(newConfig as ModalFuncProps)
            }

            if (modalRef.current !== undefined) {
              updateAction()
            } else {
              setActionQueue((prev) => [...prev, updateAction])
            }
          },
          then: async (resolve) => {
            silent = true
            return await promise.then(resolve)
          }
        }

        return instance
      },
    []
  )

  const fns = React.useMemo<ExtHookApi>(
    () => ({
      input: getConfirmFunc(withInput),
      confirm: getConfirmFunc(withConfirm)
    }),
    []
  )
  return [
    fns,
    <ElementsHolder
      key="modal-holder"
      ref={ holderRef }
    />
  ] as const
}

export function withInput (props: InputFormModalProps): ExtModalFuncProps {
  let form: FormInstance | null = null
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

  const InputForm = (): React.ReactNode => {
    const [tmpForm] = Form.useForm()
    form = tmpForm
    return (
      <Form
        form={ form }
        initialValues={ {
          input: initialValue
        } }
        layout={ 'vertical' }
      >
        <Form.Item
          label={ label }
          name="input"
          rules={ formattedRule }
        >
          <Input />
        </Form.Item>
      </Form>
    )
  }

  return {
    ...modalProps,
    type: 'confirm',
    icon: null,
    beforeOk: async () => {
      return await new Promise((resolve, reject) => {
        form!.validateFields()
          .then(() => {
            resolve(form!.getFieldValue('input'))
          })
          .catch(() => {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject()
          })
      })
    },

    onOk: async (value) => {
      props.onOk?.(value)
    },
    content: <InputForm />
  }
}

export function withConfirm (props: ModalFuncProps): ExtModalFuncProps {
  return {
    ...props,
    type: 'confirm',
    okText: props.okText ?? i18n.t('yes'),
    cancelText: props.cancelText ?? i18n.t('no')
  }
}
