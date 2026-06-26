/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo, useRef } from 'react'
import { BaseView } from '../../../layout-related/views/base-view'
import { type ObjectBlockProps } from './object-block'
import { useNumberedListSelector } from '@Pimcore/components/form/controls/numbered-list/provider/numbered-list/use-numbered-list-value'
import { BlockAddButton } from '@Pimcore/components/block/block-add-button'
import { ObjectBlockItem } from './object-block-item'
import { Space } from '@Pimcore/components/space/space'
import { Box } from '@Pimcore/components/box/box'

export interface ObjectBlockContentProps extends ObjectBlockProps {}

// only the item count matters here; each item's fields subscribe to their own value
const selectCount = (values: any[]): number => values?.length ?? 0

export const ObjectBlockContent = (props: ObjectBlockContentProps): React.JSX.Element => {
  const count = useNumberedListSelector(selectCount)
  const keyCounterRef = useRef(0)

  const maxItemsCount = props?.maxItems ?? 0
  const isNoteditable = props.noteditable === true
  const isDisallowAddRemove = props.disallowAddRemove === true

  const isItemLimitReached = maxItemsCount > 0 && count === maxItemsCount
  const isHideAddButton = isNoteditable || isItemLimitReached || count > 0 || isDisallowAddRemove

  // Generate stable keys for items to fix deletion issue
  const stableKeys = useMemo(() => {
    return Array.from({ length: count }).map(() => `object-block-item-${++keyCounterRef.current}`)
  }, [count])

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
        <Space
          className='w-full'
          direction='vertical'
          size='extra-small'
        >
          {Array.from({ length: count }).map((_value, index) => (
            <div key={ stableKeys[index] ?? `object-block-item-${index}` }>
              <ObjectBlockItem
                disallowAdd={ isDisallowAddRemove || isItemLimitReached || isNoteditable }
                disallowDelete={ isDisallowAddRemove || isNoteditable }
                disallowReorder={ props.disallowReorder === true || isNoteditable }
                field={ index }
                name={ props.name }
                noteditable={ props.noteditable }
              >
                {props.children}
              </ObjectBlockItem>
            </div>
          ))}
        </Space>
      </Box>
    </BaseView>
  ), [count, stableKeys, props, isNoteditable, isDisallowAddRemove, isItemLimitReached, isHideAddButton])
}
