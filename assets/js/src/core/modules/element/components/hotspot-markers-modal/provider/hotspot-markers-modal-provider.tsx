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
import { HotspotMarkersModal } from '../hotspot-markers-modal'
import { HotspotDataProvider } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/hotspot-data-provider'
import type { IHotspot } from '@Pimcore/components/hotspot-image/hotspot-image'
import type { CropSettings } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/types/crop-types'

export interface HotspotMarkersModalContextProps {
  openModal: (imageId: number, hotspots?: IHotspot[] | null, crop?: CropSettings | null, options?: HotspotMarkersModalOptions) => void
  closeModal: () => void
  isOpen: boolean
}

export interface HotspotMarkersModalOptions {
  disabled?: boolean
  onChange?: (hotspots: IHotspot[]) => void
}

export interface HotspotMarkersModalProviderProps {
  children: React.ReactNode
}

export const HotspotMarkersModalContext = createContext<HotspotMarkersModalContextProps | undefined>(undefined)

export const HotspotMarkersModalProvider: React.FC<HotspotMarkersModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentImageId, setCurrentImageId] = useState<number | null>(null)
  const [currentHotspots, setCurrentHotspots] = useState<IHotspot[] | null>(null)
  const [currentCrop, setCurrentCrop] = useState<CropSettings | null>(null)
  const [modalOptions, setModalOptions] = useState<HotspotMarkersModalOptions>({})

  const openModal = (imageId: number, hotspots?: IHotspot[] | null, crop?: CropSettings | null, options?: HotspotMarkersModalOptions): void => {
    setCurrentImageId(imageId)
    setCurrentHotspots(hotspots ?? null)
    setCurrentCrop(crop ?? null)
    setModalOptions(options ?? {})
    setIsOpen(true)
  }

  const closeModal = (): void => {
    setIsOpen(false)
    setCurrentImageId(null)
    setCurrentHotspots(null)
    setCurrentCrop(null)
    setModalOptions({})
  }

  const handleChange = (hotspots: IHotspot[]): void => {
    modalOptions.onChange?.(hotspots)
    closeModal()
  }

  const contextValue = useMemo(() => ({
    openModal,
    closeModal,
    isOpen
  }), [isOpen])

  return (
    <HotspotMarkersModalContext.Provider value={ contextValue }>
      {isOpen && !isNull(currentImageId) && (
        <HotspotDataProvider>
          <HotspotMarkersModal
            crop={ currentCrop ?? undefined }
            disabled={ modalOptions.disabled }
            hotspots={ currentHotspots }
            imageId={ currentImageId }
            onChange={ handleChange }
            onClose={ closeModal }
            open={ isOpen }
          />
        </HotspotDataProvider>
      )}
      {children}
    </HotspotMarkersModalContext.Provider>
  )
}