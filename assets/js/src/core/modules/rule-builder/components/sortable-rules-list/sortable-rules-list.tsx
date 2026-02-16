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
import { Content } from '@Pimcore/components/content/content'
import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { useTranslation } from 'react-i18next'
import { useRuleItemDragDrop } from '../shared/hooks/use-rule-item-drag-drop'
import type { SortableItemWithMenu } from './sortable-rules-list.types'
import { SortableRuleItem } from './sortable-rule-item'
import { isNil } from 'lodash'

export interface SortableRulesListProps {
  items: SortableItemWithMenu[]
  isDragDisabled?: boolean
  onReorder?: (newOrder: SortableItemWithMenu[]) => void
  emptyMessage?: string
  onItemClick?: (item: SortableItemWithMenu) => void
  renderItemContent?: (item: SortableItemWithMenu) => React.ReactNode
}

export function SortableRulesList ({
  items,
  isDragDisabled = false,
  onReorder,
  emptyMessage,
  onItemClick,
  renderItemContent
}: SortableRulesListProps): React.JSX.Element {
  const { t } = useTranslation()
  const { strategy, ...dndConfig } = useRuleItemDragDrop()
  const displayEmptyMessage = emptyMessage ?? t('no-items')

  const handleDragEnd = (event: DragEndEvent): void => {
    if (isNil(onReorder)) {
      return
    }

    const { active, over } = event

    if (over === null || active.id === over.id) {
      return
    }

    const oldIndex = items.findIndex((item) => String(item.id) === active.id)
    const newIndex = items.findIndex((item) => String(item.id) === over.id)

    if (oldIndex !== -1 && newIndex !== -1) {
      const newOrder = arrayMove(items, oldIndex, newIndex)
      onReorder(newOrder)
    }
  }

  if (items.length === 0) {
    return (
      <Content
        centered
        padded
      >
        {displayEmptyMessage}
      </Content>
    )
  }

  return (
    <DndContext
      onDragEnd={ handleDragEnd }
      { ...dndConfig }
    >
      <SortableContext
        items={ items.map((item) => String(item.id)) }
        strategy={ strategy }
      >
        {items.map((item) => (
          <SortableRuleItem
            contextMenuItems={ item.contextMenuItems }
            isDragDisabled={ isDragDisabled }
            item={ item }
            key={ item.id }
            onClick={ onItemClick }
            renderContent={ renderItemContent }
          />
        ))}
      </SortableContext>
    </DndContext>
  )
}
