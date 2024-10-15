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
import {Form, FormInstance, Input, type ModalFuncProps} from 'antd'
import {uuid as pimcoreUUid} from '@Pimcore/utils/uuid'
import {type HookModalRef} from 'antd/es/modal/useModal/HookModal'
import {type ModalFuncWithPromise} from 'antd/es/modal/useModal'
import usePatchElement from 'antd/es/_util/hooks/usePatchElement'
import HookModal from "@Pimcore/components/modal/form-modal/component/hook-modal/hook-modal";
import {Rule} from 'antd/lib/form'

let uuid = pimcoreUUid()

interface ElementsHolderRef {
  patchElement: ReturnType<typeof usePatchElement>[1]
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

export function useModal (): readonly [instance: ExtHookApi, contextHolder: React.ReactElement] {
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
    (withFunc: (config: ModalFuncProps) => ModalFuncProps) =>
      function hookConfirm (config: ModalFuncProps) {
        uuid += 1

        const modalRef = React.createRef<HookModalRef>()

        // Proxy to promise with `onClose`
        let resolvePromise: (confirmed: boolean) => void
        const promise = new Promise<boolean>((resolve) => {
          resolvePromise = resolve
        })
        let silent = false

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

        if (closeFunc) {
          destroyFns.push(closeFunc)
        }

        const instance: ReturnType<ModalFuncWithPromise> = {
          destroy: () => {
            function destroyAction () {
              modalRef.current?.destroy()
            }

            if (modalRef.current) {
              destroyAction()
            } else {
              setActionQueue((prev) => [...prev, destroyAction])
            }
          },
          update: (newConfig) => {
            function updateAction () {
              modalRef.current?.update(newConfig as ModalFuncProps)
            }

            if (modalRef.current) {
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
      confirm: getConfirmFunc(withConfirm),
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

export function withInput (props: InputFormModalProps): ModalFuncProps {
  let form: FormInstance | null = null
  const {
    label,
    rule,
    ...modalProps
  } = props

  let formattedRule: Rule[] = []
  if(rule !== undefined) {
    formattedRule = [rule]
  }

  const InputForm = (): React.ReactNode => {
    const [tmpForm] = Form.useForm();
    form = tmpForm
    return (
      <Form
        form={form}
        layout={'vertical'}
        initialValues={{
          input: props.initialValue
        }}
      >
        <Form.Item
          label={label}
          name="input"
          rules={formattedRule}
        >
          <Input/>
        </Form.Item>
      </Form>
    )
  }

  const handleOk = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      // Perform some validation or async operation
      form!.validateFields()
        .then(() => resolve(
          form!.getFieldValue('input')
        ))
        .catch(() => reject())
    });
  };

  return {
    ...modalProps,
    type: 'confirm',
    icon: null,
    onOk: async () => {
      const values = await handleOk()

      return props.onOk?.(values)
    },
    content: <InputForm />,
  }
}

export function withConfirm (props: ModalFuncProps): ModalFuncProps {
  return {
    ...props,
    type: 'confirm',
    okText: 'Yes',
    cancelText: 'No',
  }
}
