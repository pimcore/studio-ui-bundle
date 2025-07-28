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
import type { CropSettings } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/types/crop-types'
import { isPimcoreStudioApiAvailable, getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'
import { isInIframe } from '@Pimcore/utils/iframe'
import { useCropModalContext } from '../provider/use-crop-modal-context'

export interface UseCropModalOptions {
  disabled?: boolean
  onChange?: (crop: CropSettings | null) => void
}

export interface UseCropModalReturn {
  openModal: (imageId: number, crop?: CropSettings | null) => void
  closeModal: () => void
  isOpen: boolean
}

export const useCropModal = (options: UseCropModalOptions = {}): UseCropModalReturn => {
  const cropModalContext = useCropModalContext()

  const openModal = useCallback((imageId: number, crop?: CropSettings | null) => {
    // Check if we're in an iframe and parent API is available
    if (isInIframe() && isPimcoreStudioApiAvailable()) {
      const { element } = getPimcoreStudioApi()
      element.openCropModal({
        imageId,
        crop,
        options
      })
      return
    }

    // Fallback to local context
    cropModalContext.openModal(imageId, crop, options)
  }, [cropModalContext, options])

  const closeModal = useCallback(() => {
    cropModalContext.closeModal()
  }, [cropModalContext])

  return {
    openModal,
    closeModal,
    isOpen: cropModalContext.isOpen
  }
}
