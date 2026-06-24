/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { isFunction } from 'lodash'
import { BaseView } from '@Pimcore/components/base-view/base-view'
import { type BlockProps } from './block'
import { useNumberedListSelector } from '@Pimcore/components/form/controls/numbered-list/provider/numbered-list/use-numbered-list-value'
import { BlockAddButton } from './block-add-button'
import { BlockItem } from './block-item'
import { Box } from '@Pimcore/components/box/box'
import { Form } from '@Pimcore/components/form/form'

export interface BlockContentProps extends BlockProps {}

// only the item count matters here; each item subscribes to its own value (for its title)
const selectCount = (values: any[]): number => values?.length ?? 0

export const BlockContent = (props: BlockContentProps): React.JSX.Element => {
  const count = useNumberedListSelector(selectCount)

  const maxItemsCount = props?.maxItems ?? 0
  const isNoteditable = props.noteditable === true
  const isDisallowAddRemove = props.disallowAddRemove === true

  const isItemLimitReached = maxItemsCount > 0 && count === maxItemsCount
  const isHideAddButton = isNoteditable || isItemLimitReached || count > 0 || isDisallowAddRemove

  return useMemo(() => (
    <BaseView
      border={ props.border }
      collapsed={ props.collapsed }
      collapsible={ props.collapsible }
      contentPadding={ 'none' }
      extra={ !isHideAddButton && <BlockAddButton /> }
      extraPosition='start'
      theme='default'
      title={ props.title }
    >
      <Box padding={ { top: 'extra-small' } }>
        {Array.from({ length: count }).map((value, index) => (
          <div
            key={ `block-item-${index}` }
            style={ { marginBottom: '8px' } }
          >
            <BlockItem
              disallowAdd={ isDisallowAddRemove || isItemLimitReached || isNoteditable }
              disallowDelete={ isDisallowAddRemove || isNoteditable }
              disallowReorder={ props.disallowReorder === true || isNoteditable }
              field={ index }
              getItemTitle={ props.getItemTitle }
            >
              <Form.Group name={ index }>
                {isFunction(props.children)
                  ? props.children({ blockIndex: index })
                  : props.children}
              </Form.Group>
            </BlockItem>
          </div>
        ))}
      </Box>
    </BaseView>
  ), [count, props, isNoteditable, isDisallowAddRemove, isItemLimitReached, isHideAddButton])
}
