/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useMemo, useState } from 'react'
import { SystemInfoModal } from '@Pimcore/modules/element/components/system-info-modal/system-info-modal'
import { type Element } from '@Pimcore/modules/element/element-helper'

export type ISystemInfoModalData = Element & {
  deeplink: string
  modificationDate: number | null
  creationDate: number | null
  userOwner: number
  userModification: number | null
}

export interface SystemInfoModalContextProps {
  openModal: (data: ISystemInfoModalData) => void
  closeModal: () => void
  isOpen: boolean
}

export interface SystemInfoModalProviderProps {
  children: React.ReactNode
}

export const SystemInfoModalContext = createContext<SystemInfoModalContextProps | undefined>(undefined)

export const SystemInfoModalProvider = ({ children }: SystemInfoModalProviderProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalData, setModalData] = useState<ISystemInfoModalData | null>(null)

  const openModal = (data: ISystemInfoModalData): void => {
    setModalData(data)
    setIsOpen(true)
  }

  const closeModal = (): void => {
    setIsOpen(false)
    setModalData(null)
  }

  const contextValue = useMemo(
    () => ({
      isOpen,
      openModal,
      closeModal
    }),
    [isOpen, openModal, closeModal]
  )

  return (
    <SystemInfoModalContext.Provider value={ contextValue }>
      {children}
      <SystemInfoModal
        data={ modalData }
        isOpen={ isOpen }
        onClose={ closeModal }
      />
    </SystemInfoModalContext.Provider>
  )
}
