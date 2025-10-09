/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useLayoutEffect, useCallback } from 'react'
import { isNil } from 'lodash'
import { type AbstractDocumentEditableDefinition } from '../dynamic-type-document-editable-abstract'

export interface UsePendingElementsRevealParams {
  dynamicEditables: AbstractDocumentEditableDefinition[]
  getContainer: () => HTMLElement | null
}

export interface UsePendingElementsRevealReturn {
  hideElementUntilRendered: (element: HTMLElement) => void
  revealPendingElements: () => void
}

/**
 * Shared hook for managing pending element reveals after editables are rendered.
 * Used by both block and areablock editables to hide new elements until they're fully functional.
 */
export const usePendingElementsReveal = ({
  dynamicEditables,
  getContainer
}: UsePendingElementsRevealParams): UsePendingElementsRevealReturn => {
  const hideElementUntilRendered = (element: HTMLElement): void => {
    element.style.display = 'none'
    element.setAttribute('data-pending-editables', 'true')
  }

  const revealPendingElements = useCallback((): void => {
    const container = getContainer()
    if (!isNil(container)) {
      const pendingElements = container.querySelectorAll('[data-pending-editables="true"]')
      if (pendingElements.length > 0) {
        pendingElements.forEach(element => {
          const htmlElement = element as HTMLElement
          htmlElement.style.display = ''
          htmlElement.removeAttribute('data-pending-editables')
        })
      }
    }
  }, [getContainer])

  // Use layoutEffect to show pending elements after React rendering is complete
  useLayoutEffect(() => {
    revealPendingElements()
  }, [dynamicEditables.length, revealPendingElements])

  return {
    hideElementUntilRendered,
    revealPendingElements
  }
}
