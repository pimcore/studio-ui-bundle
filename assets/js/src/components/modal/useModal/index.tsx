import React, { useState } from 'react'
import { Modal, type ModalProps } from '@Pimcore/components/modal/modal'
import { Icon } from '@Pimcore/components/icon/icon'

interface useModalReturnType {
  renderModal: (props: ModalProps) => React.JSX.Element
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

  function renderModal (props: ModalProps): React.JSX.Element {
    const { children, ...inlineProps } = props
    const ModalComponent = getModalComponent(config.type)

    return (
            <ModalComponent
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                {...inlineProps}
            >
                {children}
            </ModalComponent>
    )
  }

  return { renderModal, showModal, handleOk, handleCancel }
}

export const withError = (Component: typeof Modal): React.FC => {
  const modalWithError = (props: ModalProps): React.JSX.Element => {
    const { children, ...inlineProps } = props

    return (
            <Component
                title={'Error'}
                icon={<Icon name={'close-circle-filled'} options={{ width: 24, height: 24 }} />}
                {...inlineProps}
            >
                {children}
            </Component>
    )
  }

  return modalWithError
}

export const withSuccess = (Component: typeof Modal): React.FC => {
  const modalWithSuccess = (props: ModalProps): React.JSX.Element => {
    const { children, ...inlineProps } = props

    return (
            <Component
                title={'Success'}
                icon={<Icon name={'check-circle-filled'} options={{ width: 24, height: 24 }}/>}
                {...inlineProps}
            >
                {children}
            </Component>
    )
  }

  return modalWithSuccess
}

export const withInfo = (Component: typeof Modal): React.FC => {
  const modalWithInfo = (props: ModalProps): React.JSX.Element => {
    const { children, ...inlineProps } = props

    return (
            <Component
                title={'Info'}
                icon={<Icon name={'info-circle-filled'} options={{ width: 24, height: 24 }}/>}
                {...inlineProps}
            >
                {children}
            </Component>
    )
  }

  return modalWithInfo
}

export const withWarn = (Component: typeof Modal): React.FC => {
  const modalWithWarn = (props: ModalProps): React.JSX.Element => {
    const { children, ...inlineProps } = props

    return (
            <Component
                title="Warn"
                icon={<Icon name={'exclamation-circle-filled'} options={{ width: 24, height: 24 }}/>}
                {...inlineProps}
            >
                {children}
            </Component>
    )
  }

  return modalWithWarn
}
