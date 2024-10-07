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
import { FormModal, type FormModalProps } from '@Pimcore/components/modal/form-modal/form-modal'
import { Form, type FormInstance, Input } from 'antd'
import {Button} from "@Pimcore/components/button/button";

type RenderModalProps = Omit<FormModalProps, 'children' | 'open'>

interface UseInputModalReturn {
  renderModal: (props: RenderModalProps) => React.JSX.Element
  showModal: () => void
  handleOk: (form: FormInstance<any>) => void
  handleCancel: () => void
  closeModal: () => void
}

type InputModal = Omit<FormModalProps, 'children'> & {
  label: string
}

type ConfirmationModal = Omit<FormModalProps, 'children'> & {
  text: string
}

interface UseInputModalProps {
  type: 'input'
}

export const useFormModal = (config: UseInputModalProps): UseInputModalReturn => {
  const { type = 'input' } = config
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const showModal = (): void => {
    setIsModalOpen(true)
  }

  const closeModal = (): void => {
    setIsModalOpen(false)
  }

  const handleOk = (): void => {
    closeModal()
  }

  const handleCancel = (): void => {
    closeModal()
  }

  function getModalComponent (type: string): typeof FormModal {
    let component = FormModal

    switch (type) {
      case 'input':
        component = withInput(FormModal)
        break
      case 'confirmation':
        component = withConfirmation(FormModal)
        break
    }

    return component
  }

  function renderModal (props: RenderModalProps): React.JSX.Element {
    const ModalComponent = getModalComponent(type)

    return (
      <ModalComponent
        { ...props }
        onCancel={ (onCancelProps) => {
          handleCancel()

          if (props.onCancel !== undefined) {
            props.onCancel(onCancelProps)
          }
        } }
        onOk={ (okProps) => {
          handleOk()

          if (props.onOk !== undefined) {
            props.onOk(okProps)
          }
        } }
        open={ isModalOpen }
      />
    )
  }

  return { renderModal, showModal, handleOk, handleCancel, closeModal }
}

export const withInput = (Component: typeof FormModal): typeof FormModal => {
  const modalWithInput = (props: InputModal): React.JSX.Element => {
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

export const withConfirmation = (Component: typeof FormModal): typeof FormModal => {
  const modalWithConfirmation = (props: ConfirmationModal): React.JSX.Element => {
    const { text, ...inlineProps } = props

    return (
      <Component
        { ...inlineProps }
        okText={'Yes'}
      >
        { text }
      </Component>
    )
  }

  return modalWithConfirmation
}
