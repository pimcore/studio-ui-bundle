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
import { Modal, type IModalProps } from '@Pimcore/components/modal/modal'

interface useModalReturnType {
  renderModal: (props: IModalProps) => React.JSX.Element
  showModal: () => void
  handleOk: () => void
  handleCancel: () => void
  closeModal: () => void
}

export const useModal = (config = { type: 'default' }): useModalReturnType => {
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

  function getModalComponent (type: string): typeof Modal {
    let component = Modal

    switch (type) {
      case 'error':
        component = withError(Modal)
        break
      case 'success':
        component = withSuccess(Modal)
        break
      case 'info':
        component = withInfo(Modal)
        break
      case 'warn':
        component = withWarn(Modal)
        break
      case 'basic':
        component = withBasic(Modal)
        break
    }

    return component
  }

  function renderModal (props: IModalProps): React.JSX.Element {
    const { children, ...inlineProps } = props
    const ModalComponent = getModalComponent(config.type)

    return (
      <ModalComponent
        onCancel={ handleCancel }
        onOk={ handleOk }
        open={ isModalOpen }
        { ...inlineProps }
      >
        {children}
      </ModalComponent>
    )
  }

  return { renderModal, showModal, handleOk, handleCancel, closeModal }
}

export const withError = (Component: typeof Modal): typeof Modal => {
  const modalWithError = (props: IModalProps): React.JSX.Element => {
    const { children, ...inlineProps } = props

    return (
      <Component
        iconName={ 'close-circle-filled' }
        title={ 'Error' }
        { ...inlineProps }
      >
        {children}
      </Component>
    )
  }

  return modalWithError
}

export const withSuccess = (Component: typeof Modal): typeof Modal => {
  const modalWithSuccess = (props: IModalProps): React.JSX.Element => {
    const { children, ...inlineProps } = props

    return (
      <Component
        iconName={ 'check-circle-filled' }
        title={ 'Success' }
        { ...inlineProps }
      >
        {children}
      </Component>
    )
  }

  return modalWithSuccess
}

export const withInfo = (Component: typeof Modal): typeof Modal => {
  const modalWithInfo = (props: IModalProps): React.JSX.Element => {
    const { children, ...inlineProps } = props

    return (
      <Component
        iconName={ 'info-circle-filled' }
        title={ 'Info' }
        { ...inlineProps }
      >
        {children}
      </Component>
    )
  }

  return modalWithInfo
}

export const withWarn = (Component: typeof Modal): typeof Modal => {
  const modalWithWarn = (props: IModalProps): React.JSX.Element => {
    const { children, ...inlineProps } = props

    return (
      <Component
        iconName={ 'exclamation-circle-filled' }
        title="Warn"
        { ...inlineProps }
      >
        {children}
      </Component>
    )
  }

  return modalWithWarn
}

export const withBasic = (Component: typeof Modal): typeof Modal => {
  const modalWithBasic = (props: IModalProps): React.JSX.Element => {
    const { children, ...inlineProps } = props

    return (
      <Component
        title={ props.title }
        { ...inlineProps }
      >
        {children}
      </Component>
    )
  }

  return modalWithBasic
}
