/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'

export interface ICustomLayoutModalContext {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

export const CustomLayoutModalContext = React.createContext<ICustomLayoutModalContext>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {}
})

export interface CustomLayoutModalProviderProps {
  children: React.ReactNode
}

export const CustomLayoutModalProvider = (props: CustomLayoutModalProviderProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = React.useState(false)

  const openModal: ICustomLayoutModalContext['openModal'] = () => { setIsOpen(true) }
  const closeModal: ICustomLayoutModalContext['closeModal'] = () => { setIsOpen(false) }

  return useMemo(() => (
    <CustomLayoutModalContext.Provider value={ { isOpen, openModal, closeModal } }>
      {props.children}
    </CustomLayoutModalContext.Provider>
  ), [isOpen, props.children])
}

export const useCustomLayoutModal = (): ICustomLayoutModalContext => {
  const context = React.useContext(CustomLayoutModalContext)

  if (context === undefined) {
    throw new Error('useCustomLayoutModal must be used within a CustomLayoutModalProvider')
  }

  return context
}
