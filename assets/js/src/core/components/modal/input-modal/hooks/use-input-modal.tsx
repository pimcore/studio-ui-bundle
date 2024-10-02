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

import React, { useState } from 'react'
import { InputModal, type InputModalProps } from '@Pimcore/components/modal/input-modal/input-modal'
import { Form, type FormInstance, Input } from 'antd'

interface UseInputModalReturn {
  renderModal: (props: Omit<InputModalProps, 'onCancel' | 'onOk' | 'open' | 'children'>) => React.JSX.Element
  showModal: () => void
  handleOk: (form: FormInstance<any>) => void
  handleCancel: () => void
  closeModal: () => void
}

type test = Omit<InputModalProps, 'children'> & {
  label: string
}

interface UseInputModalProps {
  type: 'input'
  submitCallback?: (form: FormInstance<any>) => void
}

export const useInputModal = (config: UseInputModalProps): UseInputModalReturn => {
  const { type = 'input' } = config
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const showModal = (): void => {
    setIsModalOpen(true)
  }

  const closeModal = (): void => {
    setIsModalOpen(false)
  }

  const handleOk = (form: FormInstance<any>): void => {
    if (config.submitCallback !== undefined) {
      config.submitCallback(form)
    }
    closeModal()
  }

  const handleCancel = (): void => {
    closeModal()
  }

  function getModalComponent (type: string): typeof InputModal {
    let component = InputModal

    switch (type) {
      case 'input':
        component = withInput(InputModal)
        break
    }

    return component
  }

  function renderModal (props: Omit<InputModalProps, 'onCancel' | 'onOk' | 'open' | 'children'>): React.JSX.Element {
    const ModalComponent = getModalComponent(type)

    return (
      <ModalComponent
        onCancel={ handleCancel }
        onOk={ handleOk }
        open={ isModalOpen }
        { ...props }
      />
    )
  }

  return { renderModal, showModal, handleOk, handleCancel, closeModal }
}

export const withInput = (Component: typeof InputModal): typeof InputModal => {
  const modalWithInput = (props: test): React.JSX.Element => {
    const { label, ...inlineProps } = props

    return (
      <Component { ...inlineProps }>
        <Form.Item
          label={ props.label }
          name={ 'input' }
          rules={ [{ required: true, message: 'Please input a value' }] }
        >
          <Input />
        </Form.Item>
      </Component>
    )
  }

  return modalWithInput
}
