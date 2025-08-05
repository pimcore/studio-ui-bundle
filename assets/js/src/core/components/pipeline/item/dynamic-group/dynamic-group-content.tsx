/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useNumberedList } from '@Pimcore/components/form/numbered-list/provider/numbered-list/use-numbered-list'
import React, { useEffect, useMemo } from 'react'
import { type DynamicGroupProps } from '../dynamic-group'
import { Box } from '@Pimcore/components/box/box'
import { DynamicGroupDropdown } from './dynamic-group-dropdown'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Header } from '@Pimcore/components/header/header'
import { DynamicGroupItem } from './dynamic-group-item'
import { Space } from '@Pimcore/components/space/space'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useTranslation } from 'react-i18next'
export interface DynamicGroupContentProps {
  id: DynamicGroupProps['id']
  dynamicTypeRegistryId: DynamicGroupProps['dynamicTypeRegistryId']
  showTitle?: DynamicGroupProps['showTitle']
}

export const DynamicGroupContent = ({ dynamicTypeRegistryId, id, showTitle = false }: DynamicGroupContentProps): React.JSX.Element => {
  const { values, operations } = useNumberedList()
  const [items, setItems] = React.useState(() => values.map((_, index) => index + 1))
  const isEmpty = values.length === 0
  const { t } = useTranslation()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5
      }
    })
  )

  const memoizedValues = useMemo(() => values, [values])

  useEffect(() => {
    const newItems = values.map((_, index) => index + 1)
    setItems(prevItems => {
      // Only update if the items actually changed
      if (prevItems.length !== newItems.length ||
          !prevItems.every((item, index) => item === newItems[index])) {
        return newItems
      }
      return prevItems
    })
  }, [values.length]) // Only depend on length to avoid unnecessary updates

  const onDragEnd = React.useCallback((event: any): void => {
    const { active, over } = event
    const activeId: number = Number(active.id)
    const overId: number = Number(over?.id)

    if (activeId !== overId) {
      const oldIndex = items.indexOf(activeId)
      const newIndex = items.indexOf(overId)

      // Update the items array based on the drag and drop
      const updatedItems = Array.from(items)
      updatedItems.splice(oldIndex, 1)
      updatedItems.splice(newIndex, 0, activeId)

      operations.move(oldIndex, newIndex)
      setItems(updatedItems)
    }
  }, [items, operations])

  const addButtonElement = useMemo(() => (
    <DynamicGroupDropdown dynamicTypeRegistryId={ dynamicTypeRegistryId }>
      <IconTextButton
        icon={ { value: 'new' } }
        type="link"
      >{ t(`grid.advanced-column.${id}.add`) }</IconTextButton>
    </DynamicGroupDropdown>
  ), [dynamicTypeRegistryId, id])

  const headerElement = useMemo(() => (
    <Flex align="center">
      <Header title={ t(`grid.advanced-column.${id}`) }>
        <DynamicGroupDropdown dynamicTypeRegistryId={ dynamicTypeRegistryId }>
          <IconTextButton icon={ { value: 'new' } }>{t('add')}</IconTextButton>
        </DynamicGroupDropdown>
      </Header>
    </Flex>
  ), [dynamicTypeRegistryId, id])

  const itemsList = useMemo(() => (
    <DndContext
      onDragEnd={ onDragEnd }
      sensors={ sensors }
    >
      <SortableContext
        items={ items }
        strategy={ verticalListSortingStrategy }
      >
        <Space
          className="w-full"
          direction="vertical"
          size="extra-small"
        >
          {memoizedValues.map((value, index) => (
            <React.Fragment key={ value.vId }>
              <DynamicGroupItem
                dynamicTypeRegistryId={ dynamicTypeRegistryId }
                id={ index }
              />
            </React.Fragment>
          ))}
        </Space>
      </SortableContext>
    </DndContext>
  ), [memoizedValues, items, onDragEnd, sensors, dynamicTypeRegistryId])

  return (
    <Box padding={ { bottom: 'mini' } }>
      <Space
        className="w-full"
        direction="vertical"
        size="extra-small"
      >
        {!showTitle ? addButtonElement : headerElement}

        {!isEmpty && itemsList}
      </Space>
    </Box>
  )
}
