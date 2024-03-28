import React, { useState } from 'react'
import { Modal, type IModalProps } from '@Pimcore/components/modal/modal'
import { Icon } from '@Pimcore/components/icon/icon'

interface useModalReturnType {
  renderModal: (props: IModalProps) => React.JSX.Element
  showModal: () => void
  handleOk: () => void
  handleCancel: () => void
}

export const useModal = (config = { type: 'default' }): useModalReturnType => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const showModal = (): void => {
    setIsModalOpen(true)
  }

  const handleOk = (): void => {
    setIsModalOpen(false)
  }

  const handleCancel = (): void => {
    setIsModalOpen(false)
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

  return { renderModal, showModal, handleOk, handleCancel }
}

export const withError = (Component: typeof Modal): typeof Modal => {
  const modalWithError = (props: IModalProps): React.JSX.Element => {
    const { children, ...inlineProps } = props

    return (
      <Component
        icon={ <Icon
          name={ 'close-circle-filled' }
          options={ { width: 24, height: 24 } }
               /> }
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
        icon={ <Icon
          name={ 'check-circle-filled' }
          options={ { width: 24, height: 24 } }
               /> }
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
        icon={ <Icon
          name={ 'info-circle-filled' }
          options={ { width: 24, height: 24 } }
               /> }
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
        icon={ <Icon
          name={ 'exclamation-circle-filled' }
          options={ { width: 24, height: 24 } }
               /> }
        title="Warn"
        { ...inlineProps }
      >
        {children}
      </Component>
    )
  }

  return modalWithWarn
}
