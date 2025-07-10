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
import { type LinkValue } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/link/link'
import { useLinkModalContext } from '../provider/use-link-modal-context'
import { isPimcoreStudioApiAvailable, getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'
import { isInIframe } from '@Pimcore/utils/iframe'

export interface UseLinkModalOptions {
  disabled?: boolean
  allowedTypes?: string[]
  allowedTargets?: string[]
  disabledFields?: string[]
  onSave?: (value: LinkValue) => void
}

export interface UseLinkModalReturn {
  openModal: (value?: LinkValue | null) => void
  closeModal: () => void
  isOpen: boolean
}

export const useLinkModal = (options: UseLinkModalOptions = {}): UseLinkModalReturn => {
  const linkModalContext = useLinkModalContext()

  const openModal = useCallback((value?: LinkValue | null) => {
    // Check if we're in an iframe and parent API is available
    if (isInIframe() && isPimcoreStudioApiAvailable()) {
      const { element } = getPimcoreStudioApi()
      element.openLinkModal({
        value,
        options
      })
      return
    }

    // Fallback to local context
    linkModalContext.openModal(value, options)
  }, [linkModalContext, options])

  const closeModal = useCallback(() => {
    linkModalContext.closeModal()
  }, [linkModalContext])

  return {
    openModal,
    closeModal,
    isOpen: linkModalContext.isOpen
  }
}