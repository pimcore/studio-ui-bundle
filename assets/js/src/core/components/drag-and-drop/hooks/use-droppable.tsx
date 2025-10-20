/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext } from 'react'
import { type IDroppableContext, droppableContext } from '@sdk/components'

interface DroppableHookReturn extends IDroppableContext {
  getStateClasses: () => string[]
}

export const useDroppable = (): DroppableHookReturn => {
  const { isDragActive, isOver, isValid, hasValidDrop } = useContext(droppableContext)

  function getStateClasses (): string[] {
    const cssClasses: string[] = []

    if (isDragActive) {
      cssClasses.push('dnd--drag-active')
    }

    if (isOver && isValid) {
      cssClasses.push('dnd--drag-valid')
    }

    if (isOver && !isValid) {
      cssClasses.push('dnd--drag-error')
    }

    if (hasValidDrop) {
      cssClasses.push('dnd--has-valid-drop')
    }

    return cssClasses
  }

  return {
    isDragActive,
    isOver,
    isValid,
    hasValidDrop,
    getStateClasses
  }
}
