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
import React, { Fragment, useEffect } from 'react'
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
export interface DynamicGroupContentProps {
  id: DynamicGroupProps['id']
  dynamicTypeRegistryId: DynamicGroupProps['dynamicTypeRegistryId']
  showTitle?: DynamicGroupProps['showTitle']
}

export const DynamicGroupContent = ({ dynamicTypeRegistryId, id, showTitle = false }: DynamicGroupContentProps): React.JSX.Element => {
  const { values, operations } = useNumberedList()
  const [items, setItems] = React.useState(values.map((value, index) => index + 1))
  const isEmpty = values.length === 0
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5
      }
    })
  )

  useEffect(() => {
    // Update items when values change
    setItems(values.map((value, index) => index + 1))
  }, [values])

  const onDragEnd = (event: any): void => {
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
  }

  return (
    <Box padding={ { bottom: 'mini' } }>
      <Space
        className="w-full"
        direction="vertical"
        size="extra-small"
      >
        {!showTitle
          ? (
            <DynamicGroupDropdown dynamicTypeRegistryId={ dynamicTypeRegistryId }>
              <IconTextButton
                icon={ { value: 'new' } }
                type="link"
              >Add a {id}</IconTextButton>
            </DynamicGroupDropdown>
            )
          : <></>}

        {showTitle
          ? (
            <Flex align="center">
              <Header title={ id }>
                <DynamicGroupDropdown dynamicTypeRegistryId={ dynamicTypeRegistryId }>
                  <IconTextButton icon={ { value: 'new' } }>Add</IconTextButton>
                </DynamicGroupDropdown>
              </Header>
            </Flex>
            )
          : <></>}

        {!isEmpty
          ? (
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
                  {values.map((value, index) => {
                    return (
                      <Fragment key={ value.vId }>
                        <DynamicGroupItem
                          dynamicTypeRegistryId={ dynamicTypeRegistryId }
                          id={ index }
                        />
                      </Fragment>
                    )
                  })}
                </Space>
              </SortableContext>
            </DndContext>
            )
          : <></>}
      </Space>
    </Box>
  )
}
