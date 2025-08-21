/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { useSortable } from '@dnd-kit/sortable'

export interface UseSortableElementProps {
  id: string
  element: HTMLElement
}

export interface UseSortableElementReturn {
  listeners: ReturnType<typeof useSortable>['listeners']
}

/**
 * Custom hook to handle sortable element setup for both block and areablock toolbars.
 * Manages the connection between dnd-kit's useSortable and DOM elements.
 */
export const useSortableElement = ({
  id,
  element
}: UseSortableElementProps): UseSortableElementReturn => {
  const {
    attributes,
    listeners,
    setNodeRef
  } = useSortable({ id })

  React.useEffect(() => {
    if (setNodeRef !== null) {
      setNodeRef(element)

      Object.keys(attributes).forEach(key => {
        if (attributes[key] !== undefined && key.startsWith('data-')) {
          element.setAttribute(key, String(attributes[key]))
        }
      })
    }
  }, [setNodeRef, element, attributes])

  return {
    listeners
  }
}
