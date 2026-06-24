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
import { BaseView } from '../../../layout-related/views/base-view'
import { useNumberedListSelector } from '@Pimcore/components/form/controls/numbered-list/provider/numbered-list/use-numbered-list-value'
import { type FieldCollectionProps } from './field-collection'
import { FieldCollectionItem } from './field-collection-item'
import { FieldCollectionAddButton } from './field-collection-add-button'
import { Box } from '@Pimcore/components/box/box'
import { Space } from '@Pimcore/components/space/space'

export interface FieldCollectionContentProps extends FieldCollectionProps {}

// only the item count matters here; each item subscribes to its own value, so
// editing a field no longer re-renders the whole collection
const selectCount = (values: any[]): number => values?.length ?? 0

export const FieldCollectionContent = (props: FieldCollectionContentProps): React.JSX.Element => {
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
      extra={ !isHideAddButton && <FieldCollectionAddButton allowedTypes={ props.allowedTypes } /> }
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
            <div key={ index }>
              <FieldCollectionItem
                allowedTypes={ props.allowedTypes }
                disallowAdd={ props.disallowAddRemove === true || isItemLimitReached || isNoteditable }
                disallowDelete={ props.disallowAddRemove === true || isNoteditable }
                disallowReorder={ props.disallowReorder === true || isNoteditable }
                docked={ props.border === true }
                field={ index }
                name={ props.name }
                noteditable={ props.noteditable }
              />
            </div>
          ))}
        </Space>
      </Box>
    </BaseView>
  ), [count, props, isNoteditable, isItemLimitReached])
}
