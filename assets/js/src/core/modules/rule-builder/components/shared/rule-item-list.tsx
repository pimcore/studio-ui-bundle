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
import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { Flex } from '@Pimcore/components/flex/flex'
import { Box } from '@Pimcore/components/box/box'
import ErrorBoundary from '@Pimcore/modules/app/error-boundary/error-boundary'
import { useRuleItemDragDrop } from './hooks/use-rule-item-drag-drop'
import type { RuleItem } from '@Pimcore/modules/rule-builder/types/rule-item.types'

export interface RuleItemListProps<T extends RuleItem, P = any> {
  value: T[]
  disabled?: boolean
  onChange?: (value: T[]) => void
  renderItem: (item: T, disabled: boolean) => React.ReactNode
  renderAddButton: (disabled: boolean) => React.ReactNode
  Provider: React.ComponentType<P>
  providerProps: P
}

export function RuleItemList<T extends RuleItem, P = any> (props: RuleItemListProps<T, P>): React.JSX.Element {
  const { value = [], disabled = false, onChange, renderItem, renderAddButton, Provider, providerProps } = props
  const { strategy, ...dndConfig } = useRuleItemDragDrop()

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event

    if (over === null || active.id === over.id) {
      return
    }

    const oldIndex = value.findIndex(item => item.id === active.id)
    const newIndex = value.findIndex(item => item.id === over.id)

    if (oldIndex !== -1 && newIndex !== -1) {
      const newValue = [...value]
      const [movedItem] = newValue.splice(oldIndex, 1)
      newValue.splice(newIndex, 0, movedItem)
      onChange?.(newValue)
    }
  }

  if (value.length === 0) {
    return (
      <ErrorBoundary>
        <Provider { ...providerProps }>
          <Box padding={ { y: 'extra-small' } }>
            <Flex
              align="center"
              justify="flex-start"
            >
              {renderAddButton(disabled)}
            </Flex>
          </Box>
        </Provider>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <Provider { ...providerProps }>
        <Flex
          gap="small"
          vertical
        >
          <DndContext
            onDragEnd={ handleDragEnd }
            { ...dndConfig }
          >
            <SortableContext
              items={ value.map(item => item.id) }
              strategy={ strategy }
            >
              {value.map((item, index) => (
                <Box
                  key={ item.id }
                  margin={ { bottom: index < value.length - 1 ? 'small' : 'none' } }
                >
                  {renderItem(item, disabled)}
                </Box>
              ))}
            </SortableContext>
          </DndContext>

          <Box margin={ { top: 'small' } }>
            <Flex justify="flex-start">
              {renderAddButton(disabled)}
            </Flex>
          </Box>
        </Flex>
      </Provider>
    </ErrorBoundary>
  )
}
