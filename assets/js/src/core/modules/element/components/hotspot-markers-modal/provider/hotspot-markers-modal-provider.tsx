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
import { HotspotMarkersModal } from '../hotspot-markers-modal'
import { HotspotDataProvider } from './hotspot-data-provider'
import type { IHotspot } from '@Pimcore/components/hotspot-image/hotspot-image'
import type { CropSettings } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/types/crop-types'

export interface HotspotMarkersModalContextProps {
  openModal: (modalId: string, imageId: number, hotspots?: IHotspot[] | null, crop?: CropSettings | null, options?: HotspotMarkersModalOptions) => void
  closeModal: (modalId: string) => void
  isModalOpen: (modalId: string) => boolean
}

export interface HotspotMarkersModalOptions {
  disabled?: boolean
  onChange?: (hotspots: IHotspot[]) => void
}

export interface HotspotMarkersModalProviderProps {
  children: React.ReactNode
}

interface ModalInstance {
  modalId: string
  imageId: number
  hotspots: IHotspot[] | null
  crop: CropSettings | null
  options: HotspotMarkersModalOptions
}

export const HotspotMarkersModalContext = createContext<HotspotMarkersModalContextProps | undefined>(undefined)

export const HotspotMarkersModalProvider: React.FC<HotspotMarkersModalProviderProps> = ({ children }) => {
  const [openModals, setOpenModals] = useState<Map<string, ModalInstance>>(new Map())

  const openModal = (modalId: string, imageId: number, hotspots?: IHotspot[] | null, crop?: CropSettings | null, options?: HotspotMarkersModalOptions): void => {
    setOpenModals(prev => {
      const newMap = new Map(prev)
      newMap.set(modalId, {
        modalId,
        imageId,
        hotspots: hotspots ?? null,
        crop: crop ?? null,
        options: options ?? {}
      })
      return newMap
    })
  }

  const closeModal = (modalId: string): void => {
    setOpenModals(prev => {
      const newMap = new Map(prev)
      newMap.delete(modalId)
      return newMap
    })
  }

  const isModalOpen = (modalId: string): boolean => {
    return openModals.has(modalId)
  }

  const handleModalChange = (modalId: string, hotspots: IHotspot[]): void => {
    const modalInstance = openModals.get(modalId)
    if (modalInstance) {
      modalInstance.options.onChange?.(hotspots)
      closeModal(modalId)
    }
  }

  const handleModalClose = (modalId: string): void => {
    closeModal(modalId)
  }

  const contextValue = useMemo(() => ({
    openModal,
    closeModal,
    isModalOpen
  }), [])

  return (
    <HotspotMarkersModalContext.Provider value={ contextValue }>
      {Array.from(openModals.values()).map((modalInstance) => (
        <HotspotDataProvider key={ modalInstance.modalId }>
          <HotspotMarkersModal
            crop={ modalInstance.crop ?? undefined }
            disabled={ modalInstance.options.disabled }
            hotspots={ modalInstance.hotspots }
            imageId={ modalInstance.imageId }
            onChange={ (hotspots) => handleModalChange(modalInstance.modalId, hotspots) }
            onClose={ () => handleModalClose(modalInstance.modalId) }
            open={ true }
          />
        </HotspotDataProvider>
      ))}
      {children}
    </HotspotMarkersModalContext.Provider>
  )
}
