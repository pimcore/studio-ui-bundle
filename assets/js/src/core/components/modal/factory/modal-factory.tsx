/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Modal as ModalComponent, type IModalProps } from '@sdk/components'
import React, { type ComponentType, createContext, useContext, useEffect, useMemo, useState } from 'react'

export interface OptionalModalProps extends Partial<IModalProps> {}

export interface ModalProviderProps extends OptionalModalProps {
  children: React.ReactNode
  onOpenChange?: (open: boolean) => void
}

export interface IModalContext extends Partial<IModalProps> {
  open: boolean
  openModal: () => void
  closeModal: () => void
}

export interface ModalFactoryItem {
  context: ReturnType<typeof createContext<IModalContext | undefined>>
  Modal: (props: OptionalModalProps) => React.JSX.Element
  Provider: ComponentType<ModalProviderProps>
  useModal: () => IModalContext
}

export interface CreateProps {
  defaultProps?: OptionalModalProps
}

export const create = (props?: CreateProps): ModalFactoryItem => {
  const {
    defaultProps = {}
  } = props ?? {}

  const ModalContext = createContext<IModalContext | undefined>(undefined)

  const ModalProvider = (providerProps: ModalProviderProps): React.JSX.Element => {
    const { children, onOpenChange, ...rest } = providerProps
    const props = { ...defaultProps, ...rest }
    const [open, setOpen] = useState<boolean>(props.open ?? false)

    const openModal: IModalContext['openModal'] = () => {
      setOpen(true)
      onOpenChange?.(true)
    }

    const closeModal: IModalContext['closeModal'] = () => {
      setOpen(false)
      onOpenChange?.(false)
    }

    useEffect(() => {
      if ((props.open ?? false) !== open) {
        setOpen(props.open ?? false)
      }
    }, [props.open])

    return useMemo(() => (
      <ModalContext.Provider value={ { ...props, open, openModal, closeModal } }>
        {children}
      </ModalContext.Provider>
    ), [props, open])
  }

  const useModal = (): IModalContext => {
    const context = useContext(ModalContext)

    if (context === undefined) {
      throw new Error('useModal must be used within a ModalProvider')
    }

    return context
  }

  const Modal = (props: IModalContext): React.JSX.Element => {
    const { closeModal, openModal, ...modalProps } = useModal()
    /* eslint-disable @typescript-eslint/consistent-type-assertions */
    const finalModalProps = { ...defaultProps, ...modalProps, ...props } as IModalProps

    return (
      <ModalComponent
        { ...finalModalProps }
        onCancel={ closeModal }
      />
    )
  }

  return {
    context: ModalContext,
    Modal,
    Provider: ModalProvider,
    useModal
  }
}
