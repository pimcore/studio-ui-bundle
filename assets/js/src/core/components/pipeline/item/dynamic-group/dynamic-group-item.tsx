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
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { DynamicGroupItemContent } from './dynamic-group-item-content'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { useNumberedList } from '@Pimcore/components/form/controls/numbered-list/provider/numbered-list/use-numbered-list'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { Box } from '@Pimcore/components/box/box'
import { useStyles } from './dynamic-group-item.styles'
import { useTranslation } from 'react-i18next'
import { useInjection } from '@Pimcore/app/depency-injection'
import { type DynamicTypePipelineRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/pipelines/dynamic-type-pipeline-registry'
import { usePipelineItemExpand } from '../../provider/pipeline-item-expand/use-pipeline-item-expand'
import { focusFirstEditableField } from './focus-first-editable-field'

export interface DynamicGroupItemProps {
  id: number
  groupId: string
  dynamicTypeRegistryId: string
}

const DynamicGroupItem = ({ id, groupId, dynamicTypeRegistryId }: DynamicGroupItemProps): React.JSX.Element => {
  const { operations, getValueByKey } = useNumberedList()
  const { styles } = useStyles()
  const { listeners, setNodeRef, setActivatorNodeRef, transform, transition } = useSortable({ id: id + 1 })
  const { t } = useTranslation()

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

  const registry = useInjection<DynamicTypePipelineRegistry>(dynamicTypeRegistryId)
  const { onExpandItem, focusedItem } = usePipelineItemExpand()
  const itemRef = useRef<HTMLDivElement | null>(null)

  const isExpandable = useMemo(() => {
    const type = String(keyValue)

    return onExpandItem !== undefined && registry.hasDynamicType(type) && registry.getDynamicType(type).expandable
  }, [onExpandItem, registry, keyValue])

  const isFocused = focusedItem?.groupId === groupId && focusedItem.index === id

  const setRefs = useCallback((node: HTMLDivElement | null): void => {
    setNodeRef(node)
    itemRef.current = node
  }, [setNodeRef])

  useEffect(() => {
    if (!isFocused || itemRef.current === null) {
      return
    }

    itemRef.current.scrollIntoView({ block: 'center' })
    focusFirstEditableField(itemRef.current)
  }, [isFocused])

  return (
    <div
      ref={ setRefs }
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
            <Text strong>{t(`grid.advanced-column.advancedColumns.${keyValue}`)}</Text>

            { isExpandable && (
              <IconButton
                aria-label={ t('grid.advanced-column.expand') }
                icon={ { value: 'show-details' } }
                onClick={ () => { onExpandItem?.({ groupId, index: id }) } }
                tooltip={ { title: t('grid.advanced-column.expand') } }
              />
            ) }
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
