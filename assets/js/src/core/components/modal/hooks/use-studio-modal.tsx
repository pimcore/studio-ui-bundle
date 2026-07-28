/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { App, type ModalFuncProps } from 'antd'
import { useMemo } from 'react'
import { isInIframe } from '@Pimcore/utils/iframe'
import { isPimcoreStudioApiAvailable, getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'
import { withDraggableModalRender } from '@Pimcore/components/modal/hooks/draggable-modal-render'

type ModalStaticFunctions = ReturnType<typeof App.useApp>['modal']

/** Imperative modal methods whose dialogs should become draggable by their title. */
const DRAGGABLE_METHODS = ['confirm', 'info', 'success', 'error', 'warning'] as const

/**
 * Wraps an imperative modal instance so its confirm/info/success/error/warning
 * dialogs are draggable, composing with any `modalRender` the caller already
 * provides (e.g. the form modals' autofocus render).
 */
function withDraggableModals (modal: ModalStaticFunctions): ModalStaticFunctions {
  const wrapped = { ...modal }

  DRAGGABLE_METHODS.forEach((method) => {
    const original = modal[method]
    wrapped[method] = (config: ModalFuncProps) => original({
      ...config,
      modalRender: withDraggableModalRender(config.modalRender)
    })
  })

  return wrapped
}

export interface StudioModalResponse {
  modal: ModalStaticFunctions
  localModal: ModalStaticFunctions
}

/**
 * Hook that provides modal functionality that works seamlessly across iframe boundaries.
 * When in an iframe, it uses the parent window's modal instance.
 * When not in an iframe, it uses the current window's modal instance.
 */
export function useStudioModal (): StudioModalResponse {
  const { modal: localModal } = App.useApp()

  return useMemo<StudioModalResponse>(() => {
    let studioModal = localModal

    // Check if we're in an iframe and parent API is available
    if (isInIframe() && isPimcoreStudioApiAvailable()) {
      try {
        // Get the parent window's modal instance through the studio API
        const { modal } = getPimcoreStudioApi()
        studioModal = modal
      } catch (error) {
        console.warn('Failed to access parent window modal, falling back to local modal:', error)
      }
    }

    return {
      modal: withDraggableModals(studioModal),
      localModal: withDraggableModals(localModal)
    }
  }, [localModal])
}
