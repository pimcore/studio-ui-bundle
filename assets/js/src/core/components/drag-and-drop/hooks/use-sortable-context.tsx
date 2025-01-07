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

import { closestCenter, DndContext, type DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, sortableKeyboardCoordinates, type SortingStrategy, verticalListSortingStrategy } from '@dnd-kit/sortable'
import React, { type ComponentType, type ReactNode } from 'react'

export interface IUseSortableContextProps {
  onDragEnd: (event: DragEndEvent) => void
  items: any[]
  sortingStrategy?: SortingStrategy
}

export interface IUseSortableContextHookReturn {
  ContextHolder: ComponentType<ContextHolderProps>
}

export interface ContextHolderProps {
  children: ReactNode
}

export const useSortableContext = ({ onDragEnd, items, sortingStrategy = verticalListSortingStrategy }: IUseSortableContextProps): IUseSortableContextHookReturn => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const ContextHolder = ({ children }: ContextHolderProps): React.JSX.Element => {
    return (
      <DndContext
        collisionDetection={ closestCenter }
        onDragEnd={ onDragEnd }
        sensors={ sensors }
      >
        <SortableContext
          items={ items }
          strategy={ sortingStrategy }
        >
          {children}
        </SortableContext>
      </DndContext>
    )
  }

  return { ContextHolder }
}
