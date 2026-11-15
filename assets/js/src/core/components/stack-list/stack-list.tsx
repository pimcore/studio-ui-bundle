/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useMemo, useState } from 'react'
import cn from 'classnames'
import { StackListItem, type StackListItemProps } from './stack-list-item'
import { useStyles } from './stack-list.styles'
import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable'

export interface StackListProps {
  items: StackListItemProps[]
  sortable?: boolean
  onItemsChange?: (items: StackListItemProps[]) => void
}

// React keys must not be spread into JSX
const withoutKey = ({ key, ...rest }: StackListItemProps): StackListItemProps => rest

// stable options: useSensor memoizes on their identity
const KEYBOARD_SENSOR_OPTIONS = { coordinateGetter: sortableKeyboardCoordinates }

export const StackList = ({ items, onItemsChange, sortable }: StackListProps): React.JSX.Element => {
  const [itemsState, setItems] = useState<StackListProps['items']>(items)
  const { styles } = useStyles()
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, KEYBOARD_SENSOR_OPTIONS)
  )

  useEffect(() => {
    setItems(items)
  }, [items])

  return useMemo(() => (
    <div className={ cn('stack-list', styles.stackList) }>
      {sortable === true && (
        <DndContext
          onDragEnd={ onDragEnd }
          sensors={ sensors }
        >
          <SortableContext items={ itemsState.map((item) => item.id) }>
            {itemsState.map((item) => (
              <div
                className="stack-list__item"
                key={ item.key ?? item.id }
              >
                <StackListItem { ...withoutKey(item) } />
              </div>
            ))}
          </SortableContext>
        </DndContext>
      )}

      {sortable !== true && (
        <>
          {itemsState.map((item) => (
            <div
              className="stack-list__item"
              key={ item.key ?? item.id }
            >
              <StackListItem { ...withoutKey(item) } />
            </div>
          ))}
        </>
      )}
    </div>
  ), [itemsState, sensors])

  function onDragEnd (event: DragEndEvent): void {
    const { active, over } = event

    if (over !== null && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        const newItems = arrayMove(items, oldIndex, newIndex)

        if (onItemsChange !== undefined) {
          onItemsChange(newItems)
        }

        return newItems
      })
    }
  }
}
