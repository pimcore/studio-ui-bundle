/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { useContext } from 'react'
import { type IDroppableContext, droppableContext } from '../droppable-context-provider'

interface DroppableHookReturn extends IDroppableContext {
  getStateClasses: () => string[]
}

export const useDroppable = (): DroppableHookReturn => {
  const { isDragActive, isOver, isValid } = useContext(droppableContext)

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

    return cssClasses
  }

  return {
    isDragActive,
    isOver,
    isValid,
    getStateClasses
  }
}
