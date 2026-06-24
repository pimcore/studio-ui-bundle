/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useEffect, useMemo, useState } from 'react'
import { ClassificationStoreModal, type ClassificationStoreModalProps } from '../components/classification-store-modal/classification-store-modal'
import ClassificationStoreProvider from './classification-store-provider'
import useClassificationStore from './use-classification-store'

export interface IClassificationStoreModalContext {
  modalContext: ClassificationStoreModalProps | undefined
  setModalContext: (context: ClassificationStoreModalProps | undefined) => void
  fireUpdateEvent: (data: any) => void
  dataChangeEvent: (data: any) => void
  setDataChangeEvent: (dataChangeEvent: (data: any) => void) => void
}

export const classificationStoreModalContext = createContext<IClassificationStoreModalContext | undefined>(undefined)

export interface ClassificationStoreModalProviderProps {
  children: React.ReactNode
}

export const ClassificationStoreModalProvider = ({ children }: ClassificationStoreModalProviderProps): React.JSX.Element => {
  const [modalContext, setModalContext] = useState<ClassificationStoreModalProps | undefined>(undefined)
  const [dataChangeEvent, setDataChangeEvent] = useState<(data: any) => void>(() => () => {})

  const fireUpdateEvent = (data: any): void => {
    if (dataChangeEvent !== undefined) {
      dataChangeEvent({ ...data, modalContext })
    }
  }

  return useMemo(() => (
    <ClassificationStoreProvider>
      <classificationStoreModalContext.Provider value={ { modalContext, setModalContext, fireUpdateEvent, dataChangeEvent, setDataChangeEvent } }>
        {children}

        {modalContext !== undefined && (
          <ClassificationStoreModal
            { ...modalContext }
          />
        )}
      </classificationStoreModalContext.Provider>
    </ClassificationStoreProvider>
  ), [modalContext, children])
}

export interface UseClassificationStoreModalProps {
  onUpdate?: (data: any) => void
}

export interface UseClassificationStoreModalReturn {
  openModal: (context: ClassificationStoreModalProps) => void
  closeModal: () => void
  fireUpdateEvent: (data: any) => void
}

export const useClassificationStoreModal = (props: UseClassificationStoreModalProps): UseClassificationStoreModalReturn => {
  const context = React.useContext(classificationStoreModalContext)
  const classificationStore = useClassificationStore()

  useEffect(() => {
    // Only register a real callback. Consumers that read the modal without supplying an `onUpdate`
    // (e.g. the modal's own tabs) must not clobber the callback the opener registered.
    if (context !== undefined && props?.onUpdate !== undefined) {
      context.setDataChangeEvent(() => props.onUpdate)
    }
  }, [context, props?.onUpdate])

  if (context === undefined) {
    throw new Error('useClassificationStoreModal must be used within a ClassificationStoreModalProvider')
  }

  const openModal = (modalContext: ClassificationStoreModalProps): void => {
    context.setModalContext(modalContext)
    classificationStore.openModal()
  }

  const closeModal = (): void => {
    context.setModalContext(undefined)
    classificationStore.closeModal()
  }

  return {
    openModal,
    closeModal,
    fireUpdateEvent: context.fireUpdateEvent
  }
}

export const useClassificationStoreModalOptional = (props: UseClassificationStoreModalProps): UseClassificationStoreModalReturn | undefined => {
  const context = React.useContext(classificationStoreModalContext)
  const classificationStore = useClassificationStore()
  const { onUpdate } = props

  useEffect(() => {
    // Only register a real callback. Consumers that read the modal without supplying an `onUpdate`
    // (e.g. the modal's own tabs) must not clobber the callback the opener registered.
    if (context !== undefined && onUpdate !== undefined) {
      context.setDataChangeEvent(() => onUpdate)
    }
  }, [context, onUpdate])

  if (context === undefined) {
    return undefined
  }

  const openModal = (modalContext: ClassificationStoreModalProps): void => {
    context.setModalContext(modalContext)
    classificationStore.openModal()
  }

  const closeModal = (): void => {
    context.setModalContext(undefined)
    classificationStore.closeModal()
  }

  return {
    openModal,
    closeModal,
    fireUpdateEvent: context.fireUpdateEvent
  }
}
