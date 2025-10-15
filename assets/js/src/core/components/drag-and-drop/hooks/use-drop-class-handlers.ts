/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect, useCallback } from 'react'
import { isNil } from 'lodash'

export interface UseDropClassHandlersOptions {
  dropClass?: string
  enabled?: boolean
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
}

/**
 * Custom hook to manage drag and drop event listeners on external DOM elements with a specified CSS class.
 * Takes existing React event handlers and creates DOM-compatible wrappers that call the original handlers with mock events.
 */
export const useDropClassHandlers = ({
  dropClass,
  enabled = true,
  onDragOver,
  onDragLeave,
  onDrop
}: UseDropClassHandlersOptions): void => {
  const mockEvent: React.DragEvent = { preventDefault: () => {}, stopPropagation: () => {} } as any as React.DragEvent

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onDragOver(mockEvent)
  }, [onDragOver])

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault()
    onDragLeave(mockEvent)
  }, [onDragLeave])

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault()
    onDrop(mockEvent)
  }, [onDrop])

  useEffect(() => {
    if (isNil(dropClass) || !enabled) {
      return
    }

    const elements = Array.from(document.querySelectorAll(`.${dropClass}`))

    elements.forEach((element) => {
      element.addEventListener('dragover', handleDragOver)
      element.addEventListener('dragleave', handleDragLeave)
      element.addEventListener('drop', handleDrop)
    })

    return () => {
      elements.forEach((element) => {
        element.removeEventListener('dragover', handleDragOver)
        element.removeEventListener('dragleave', handleDragLeave)
        element.removeEventListener('drop', handleDrop)
      })
    }
  }, [dropClass, enabled, handleDragOver, handleDragLeave, handleDrop])
}
