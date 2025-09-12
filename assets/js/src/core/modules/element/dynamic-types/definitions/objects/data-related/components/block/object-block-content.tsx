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
import { useNumberedList } from '@Pimcore/components/form/controls/numbered-list/provider/numbered-list/use-numbered-list'
import { BlockAddButton } from '@Pimcore/components/block/block-add-button'
import { ObjectBlockItem } from './object-block-item'
import { Space } from '@Pimcore/components/space/space'
import { Box } from '@Pimcore/components/box/box'

export interface ObjectBlockContentProps extends ObjectBlockProps {}

export const ObjectBlockContent = (props: ObjectBlockContentProps): React.JSX.Element => {
  const { values } = useNumberedList()
  const keyCounterRef = useRef(0)

  const maxItemsCount = props?.maxItems ?? 0
  const valuesKeys = Object.keys(values)
  const isNoteditable = props.noteditable === true
  const isDisallowAddRemove = props.disallowAddRemove === true

  const isItemLimitReached = maxItemsCount > 0 && valuesKeys.length === maxItemsCount
  const isHideAddButton = isNoteditable || isItemLimitReached || valuesKeys.length > 0 || isDisallowAddRemove

  // Generate stable keys for items to fix deletion issue
  const stableKeys = useMemo(() => {
    return values.map(() => `object-block-item-${++keyCounterRef.current}`)
  }, [values.length])

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
          {values.map((_value, index) => (
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
  ), [values, props, isNoteditable, isDisallowAddRemove, isItemLimitReached, isHideAddButton])
}
