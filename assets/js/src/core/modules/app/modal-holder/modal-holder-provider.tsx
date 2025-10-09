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

interface ModalInstance {
  id: string
  component: React.ReactElement
}

export interface ModalHolderContextProps {
  addModal: (id: string, component: React.ReactElement) => void
  removeModal: (id: string) => void
  hasModal: (id: string) => boolean
}

interface ModalHolderProviderProps {
  children: React.ReactNode
}

export const ModalHolderContext = createContext<ModalHolderContextProps | undefined>(undefined)

export const ModalHolderProvider = ({ children }: ModalHolderProviderProps): React.JSX.Element => {
  const [modals, setModals] = useState<Map<string, ModalInstance>>(new Map())

  const addModal = (id: string, component: React.ReactElement): void => {
    setModals(prev => {
      const newMap = new Map(prev)
      newMap.set(id, { id, component })
      return newMap
    })
  }

  const removeModal = (id: string): void => {
    setModals(prev => {
      const newMap = new Map(prev)
      newMap.delete(id)
      return newMap
    })
  }

  const hasModal = (id: string): boolean => {
    return modals.has(id)
  }

  const contextValue = useMemo(() => ({
    addModal,
    removeModal,
    hasModal
  }), [])

  return (
    <ModalHolderContext.Provider value={ contextValue }>
      {children}
      {Array.from(modals.values()).map(modal => (
        <React.Fragment key={ modal.id }>
          {modal.component}
        </React.Fragment>
      ))}
    </ModalHolderContext.Provider>
  )
}
