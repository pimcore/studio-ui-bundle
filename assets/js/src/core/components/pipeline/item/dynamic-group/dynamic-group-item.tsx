/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Form } from '@Pimcore/components/form/form'
import { Input } from '@Pimcore/components/input/input'
import React, { useMemo } from 'react'
import { DynamicGroupItemContent } from './dynamic-group-item-content'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { useNumberedList } from '@Pimcore/components/form/numbered-list/provider/numbered-list/use-numbered-list'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { Box } from '@Pimcore/components/box/box'
import { useStyles } from './dynamic-group-item.styles'

export interface DynamicGroupItemProps {
  id: number
  dynamicTypeRegistryId: string
}

const DynamicGroupItem = ({ id, dynamicTypeRegistryId }: DynamicGroupItemProps): React.JSX.Element => {
  const { operations, getValueByKey } = useNumberedList()
  const { styles } = useStyles()
  const { listeners, setNodeRef, setActivatorNodeRef, transform, transition } = useSortable({ id: id + 1 })

  const style = useMemo(() => ({
    transform: CSS.Transform.toString(transform),
    transition: transition ?? undefined
  }), [transform, transition])

  const onDelete = React.useCallback((): void => {
    operations.remove(id)
  }, [operations, id])

  const keyValue = useMemo(() => {
    return getValueByKey(id.toString()).key
  }, [getValueByKey, id])

  return (
    <div
      ref={ setNodeRef }
      style={ style }
    >
      <Box
        className={ styles.dynamicGroupItem }
        padding={ { x: 'extra-small', top: 'mini', bottom: 'small' } }
      >
        <Flex
          align="center"
          gap="small"
          justify="space-between"
        >
          <Flex
            align="center"
            gap="mini"
          >
            <IconButton
              icon={ { value: 'drag-option' } }
              ref={ setActivatorNodeRef }
              theme="secondary"
              variant="minimal"
              { ...listeners }
            />
            <Text strong>{keyValue}</Text>
          </Flex>

          <IconButton
            icon={ { value: 'trash' } }
            onClick={ onDelete }
          />
        </Flex>

        <Form.Item
          name={ id }
        >
          <Form.KeyedList>
            <Form.Item
              className="d-none"
              hidden
              name="key"
            >
              <Input />
            </Form.Item>

            <DynamicGroupItemContent dynamicTypeRegistryId={ dynamicTypeRegistryId } />
          </Form.KeyedList>
        </Form.Item>
      </Box>
    </div>
  )
}

const memoedDynamicGroupItem = React.memo(DynamicGroupItem)
export { memoedDynamicGroupItem as DynamicGroupItem }
