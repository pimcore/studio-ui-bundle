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

import React, { useEffect, useState } from 'react'
import { StackListItem, type StackListItemProps } from './stack-list-item'
import { useStyles } from './stack-list.styles'
import { useSortableContext } from '../drag-and-drop/hooks/use-sortable-context'
import { type DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

export interface StackListProps {
  items: StackListItemProps[]
  sortable?: boolean
  onItemsChange?: (items: StackListItemProps[]) => void
}

export const StackList = ({ items, onItemsChange }: StackListProps): React.JSX.Element => {
  const [itemsState, setItems] = useState<StackListProps['items']>(items)
  const { ContextHolder } = useSortableContext({
    items: itemsState,
    onDragEnd
  })
  const { styles } = useStyles()

  useEffect(() => {
    setItems(items)
  }, [items])

  return (
    <div className={ ['stack-list', styles.stackList].join(' ') }>
      <ContextHolder>
        {itemsState.map((item, index) => (
          <div
            className="stack-list__item"
            key={ item.id }
          >
            <StackListItem { ...item } />
          </div>
        ))}
      </ContextHolder>
    </div>
  )

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
