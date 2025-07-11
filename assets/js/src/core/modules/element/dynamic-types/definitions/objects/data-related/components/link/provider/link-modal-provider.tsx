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
import { LinkModal } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal'
import { type LinkValue } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/link/link'

export interface LinkModalContextProps {
  openModal: (value?: LinkValue | null, options?: LinkModalOptions) => void
  closeModal: () => void
  isOpen: boolean
}

export interface LinkModalOptions {
  disabled?: boolean
  allowedTypes?: string[]
  allowedTargets?: string[]
  disabledFields?: string[]
  onSave?: (value: LinkValue) => void
}

export interface LinkModalProviderProps {
  children: React.ReactNode
}

export const LinkModalContext = createContext<LinkModalContextProps | undefined>(undefined)

export const LinkModalProvider: React.FC<LinkModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentValue, setCurrentValue] = useState<LinkValue | null>(null)
  const [modalOptions, setModalOptions] = useState<LinkModalOptions>({})

  const openModal = (value?: LinkValue | null, options?: LinkModalOptions): void => {
    setCurrentValue(value ?? null)
    setModalOptions(options ?? {})
    setIsOpen(true)
  }

  const closeModal = (): void => {
    setIsOpen(false)
    setCurrentValue(null)
    setModalOptions({})
  }

  const handleSave = (value: LinkValue): void => {
    modalOptions.onSave?.(value)
    closeModal()
  }

  const contextValue = useMemo(() => ({
    openModal,
    closeModal,
    isOpen
  }), [isOpen])

  return (
    <LinkModalContext.Provider value={ contextValue }>
      {isOpen && (
        <LinkModal
          allowedTargets={ modalOptions.allowedTargets ?? [] }
          allowedTypes={ modalOptions.allowedTypes ?? [] }
          disabled={ modalOptions.disabled ?? false }
          disabledFields={ modalOptions.disabledFields ?? [] }
          onClose={ closeModal }
          onSave={ handleSave }
          open={ isOpen }
          value={ currentValue }
        />
      )}
      {children}
    </LinkModalContext.Provider>
  )
}
