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
import { isNull } from 'lodash'
import { CropModal } from '@Pimcore/modules/element/components/crop-modal'
import type { CropSettings } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/types/crop-types'

export interface CropModalContextProps {
  openModal: (imageId: number, crop?: CropSettings | null, options?: CropModalOptions) => void
  closeModal: () => void
  isOpen: boolean
}

export interface CropModalOptions {
  disabled?: boolean
  onChange?: (crop: CropSettings | null) => void
}

export interface CropModalProviderProps {
  children: React.ReactNode
}

export const CropModalContext = createContext<CropModalContextProps | undefined>(undefined)

export const CropModalProvider: React.FC<CropModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentImageId, setCurrentImageId] = useState<number | null>(null)
  const [currentCrop, setCurrentCrop] = useState<CropSettings | null>(null)
  const [modalOptions, setModalOptions] = useState<CropModalOptions>({})

  const openModal = (imageId: number, crop?: CropSettings | null, options?: CropModalOptions): void => {
    setCurrentImageId(imageId)
    setCurrentCrop(crop ?? null)
    setModalOptions(options ?? {})
    setIsOpen(true)
  }

  const closeModal = (): void => {
    setIsOpen(false)
    setCurrentImageId(null)
    setCurrentCrop(null)
    setModalOptions({})
  }

  const handleChange = (crop: CropSettings | null): void => {
    modalOptions.onChange?.(crop)
    closeModal()
  }

  const contextValue = useMemo(() => ({
    openModal,
    closeModal,
    isOpen
  }), [isOpen])

  return (
    <CropModalContext.Provider value={ contextValue }>
      {isOpen && !isNull(currentImageId) && (
        <CropModal
          crop={ currentCrop }
          disabled={ modalOptions.disabled }
          imageId={ currentImageId }
          onChange={ handleChange }
          onClose={ closeModal }
          open={ isOpen }
        />
      )}
      {children}
    </CropModalContext.Provider>
  )
}
