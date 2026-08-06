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
import { Flex } from '@Pimcore/components/flex/flex'
import { Icon } from '@Pimcore/components/icon/icon'
import { Text } from '@Pimcore/components/text/text'
import { Dropdown, type DropdownProps } from '@Pimcore/components/dropdown/dropdown'
import cn from 'classnames'
import { useSortableItem } from '../shared/hooks/use-sortable-item'
import { useStyles } from './sortable-rules-list.styles'
import type { SortableItem } from './sortable-rules-list.types'
import { isNil } from 'lodash'

export interface SortableRuleItemProps {
  item: SortableItem
  isDragDisabled: boolean
  contextMenuItems?: DropdownProps['menu']['items']
  onClick?: (item: SortableItem) => void
  renderContent?: (item: SortableItem) => React.ReactNode
}

export function SortableRuleItem ({
  item,
  isDragDisabled,
  contextMenuItems,
  onClick,
  renderContent
}: SortableRuleItemProps): React.JSX.Element {
  const { styles } = useStyles()

  const {
    attributes,
    listeners,
    setNodeRef,
    style
  } = useSortableItem(String(item.id), { disabled: isDragDisabled })

  const content = (
    <Flex
      align="center"
      className={ styles.ruleItem }
      gap="mini"
      onClick={ onClick !== undefined ? () => { onClick(item) } : undefined }
      ref={ setNodeRef }
      style={ style }
      { ...attributes }
      { ...(!isDragDisabled ? listeners : {}) }
    >
      <Icon
        className={ cn(
          styles.ruleItemIcon,
          { [styles.inactiveIcon]: item.active === false }
        ) }
        subIconName={ item.active === false ? 'eye-off' : undefined }
        type={ item.icon?.type ?? 'name' }
        value={ item.icon?.value ?? 'target' }
      />
      {isNil(renderContent)
        ? (
          <Text className={ styles.ruleItemTitle }>
            {item.label}
          </Text>
          )
        : renderContent(item)}
    </Flex>
  )

  if (contextMenuItems !== undefined && contextMenuItems.length > 0) {
    return (
      <Dropdown
        menu={ { items: contextMenuItems } }
        trigger={ ['contextMenu'] }
      >
        {content}
      </Dropdown>
    )
  }

  return content
}
