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
import { useNumberedList } from '@Pimcore/components/form/controls/numbered-list/provider/numbered-list/use-numbered-list'
import { type FieldCollectionProps } from './field-collection'
import { FieldCollectionItem } from './field-collection-item'
import { FieldCollectionAddButton } from './field-collection-add-button'
import { Box } from '@Pimcore/components/box/box'
import { Space } from '@Pimcore/components/space/space'

export interface FieldCollectionContentProps extends FieldCollectionProps {}

export const FieldCollectionContent = (props: FieldCollectionContentProps): React.JSX.Element => {
  const { values } = useNumberedList()

  const maxItemsCount = props?.maxItems ?? 0
  const valuesKeys = Object.keys(values)
  const isNoteditable = props.noteditable === true
  const isDisallowAddRemove = props.disallowAddRemove === true

  const isItemLimitReached = maxItemsCount > 0 && valuesKeys.length === maxItemsCount
  const isHideAddButton = isNoteditable || isItemLimitReached || valuesKeys.length > 0 || isDisallowAddRemove

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
          {values.map((_value, index) => (
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
  ), [values])
}
