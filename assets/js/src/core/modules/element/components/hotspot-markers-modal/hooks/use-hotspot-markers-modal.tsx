/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback, useMemo } from 'react'
import type { IHotspot } from '@Pimcore/components/hotspot-image/hotspot-image'
import type { CropSettings } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/types/crop-types'
import { isPimcoreStudioApiAvailable, getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'
import { isInIframe } from '@Pimcore/utils/iframe'
import { uuid } from '@Pimcore/utils/uuid'
import { useHotspotMarkersModalContext } from '../provider/use-hotspot-markers-modal-context'

export interface UseHotspotMarkersModalOptions {
  disabled?: boolean
  onChange?: (hotspots: IHotspot[]) => void
}

export interface UseHotspotMarkersModalReturn {
  openModal: (imageId: number, hotspots?: IHotspot[] | null, crop?: CropSettings | null) => void
  closeModal: () => void
  isOpen: boolean
  modalId: string
}

export const useHotspotMarkersModal = (options: UseHotspotMarkersModalOptions = {}): UseHotspotMarkersModalReturn => {
  const modalId = useMemo(() => {
    return `hotspot-markers-modal-${uuid()}`
  }, [])

  const context = useHotspotMarkersModalContext()

  const openModal = useCallback((imageId: number, hotspots?: IHotspot[] | null, crop?: CropSettings | null) => {
    if (isInIframe() && isPimcoreStudioApiAvailable()) {
      const { element } = getPimcoreStudioApi()
      element.openHotspotMarkersModal({
        imageId,
        hotspots,
        crop,
        options
      })
      return
    }

    context.openModal(modalId, imageId, hotspots, crop, options)
  }, [modalId, context, options])

  const closeModal = useCallback(() => {
    if (isInIframe() && isPimcoreStudioApiAvailable()) {
      return
    }

    context.closeModal(modalId)
  }, [modalId, context])

  const isOpen = context.isModalOpen(modalId)

  return {
    openModal,
    closeModal,
    isOpen,
    modalId
  }
}
