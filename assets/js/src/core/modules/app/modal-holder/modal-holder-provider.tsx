/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, useMemo, useState } from 'react'
import { isNil } from 'lodash'

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
  /**
   * Whether the held modals are rendered right after `children`. Pass `false` and mount a
   * `ModalHolderOutlet` further down the tree instead, so the held modals inherit every
   * provider mounted between this provider and the outlet.
   */
  renderModals?: boolean
}

export const ModalHolderContext = createContext<ModalHolderContextProps | undefined>(undefined)

const ModalHolderModalsContext = createContext<ModalInstance[] | undefined>(undefined)

/**
 * Renders the modals held by the closest `ModalHolderProvider`. Mount it at the place in the
 * tree whose providers the held modals need access to.
 */
export const ModalHolderOutlet = (): React.JSX.Element => {
  const modals = useContext(ModalHolderModalsContext)

  if (isNil(modals)) {
    throw new Error('ModalHolderOutlet must be used within a ModalHolderProvider')
  }

  return (
    <>
      {modals.map(modal => (
        <React.Fragment key={ modal.id }>
          {modal.component}
        </React.Fragment>
      ))}
    </>
  )
}

export const ModalHolderProvider = ({ children, renderModals = true }: ModalHolderProviderProps): React.JSX.Element => {
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

  const modalList = useMemo(() => Array.from(modals.values()), [modals])

  return (
    <ModalHolderContext.Provider value={ contextValue }>
      <ModalHolderModalsContext.Provider value={ modalList }>
        {children}
        {renderModals && <ModalHolderOutlet />}
      </ModalHolderModalsContext.Provider>
    </ModalHolderContext.Provider>
  )
}
