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
import { type VideoValue, type VideoType } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/video/video'
import { isPimcoreStudioApiAvailable, getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'
import { isInIframe } from '@Pimcore/utils/iframe'
import { useVideoModalContext } from '@Pimcore/modules/element/components/video-modal/provider/use-video-modal-context'

export interface UseVideoModalOptions {
  disabled?: boolean
  allowedVideoTypes?: VideoType[]
  onChange?: (value: VideoValue | null) => void
}

export interface UseVideoModalReturn {
  openModal: (value?: VideoValue | null) => void
  closeModal: () => void
  isOpen: boolean
}

export const useVideoModal = (options: UseVideoModalOptions = {}): UseVideoModalReturn => {
  const videoModalContext = useVideoModalContext()

  const openModal = useCallback((value?: VideoValue | null) => {
    // Check if we're in an iframe and parent API is available
    if (isInIframe() && isPimcoreStudioApiAvailable()) {
      const { element } = getPimcoreStudioApi()
      element.openVideoModal({
        value,
        options
      })
      return
    }

    // Fallback to local context
    videoModalContext.openModal(value, options)
  }, [videoModalContext, options])

  const closeModal = useCallback(() => {
    videoModalContext.closeModal()
  }, [videoModalContext])

  return {
    openModal,
    closeModal,
    isOpen: videoModalContext.isOpen
  }
}
