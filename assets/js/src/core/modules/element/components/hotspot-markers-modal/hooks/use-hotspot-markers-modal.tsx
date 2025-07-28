/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback } from 'react'
import type { IHotspot } from '@Pimcore/components/hotspot-image/hotspot-image'
import type { CropSettings } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/types/crop-types'
import { isPimcoreStudioApiAvailable, getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'
import { isInIframe } from '@Pimcore/utils/iframe'
import { useHotspotMarkersModalContext } from '../provider/use-hotspot-markers-modal-context'

export interface UseHotspotMarkersModalOptions {
  disabled?: boolean
  onChange?: (hotspots: IHotspot[]) => void
}

export interface UseHotspotMarkersModalReturn {
  openModal: (imageId: number, hotspots?: IHotspot[] | null, crop?: CropSettings | null) => void
  closeModal: () => void
  isOpen: boolean
}

export const useHotspotMarkersModal = (options: UseHotspotMarkersModalOptions = {}): UseHotspotMarkersModalReturn => {
  const hotspotMarkersModalContext = useHotspotMarkersModalContext()

  const openModal = useCallback((imageId: number, hotspots?: IHotspot[] | null, crop?: CropSettings | null) => {
    // Check if we're in an iframe and parent API is available
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

    // Fallback to local context
    hotspotMarkersModalContext.openModal(imageId, hotspots, crop, options)
  }, [hotspotMarkersModalContext, options])

  const closeModal = useCallback(() => {
    hotspotMarkersModalContext.closeModal()
  }, [hotspotMarkersModalContext])

  return {
    openModal,
    closeModal,
    isOpen: hotspotMarkersModalContext.isOpen
  }
}