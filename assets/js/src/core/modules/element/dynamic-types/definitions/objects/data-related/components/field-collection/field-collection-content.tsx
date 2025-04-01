/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React, { useMemo } from 'react'
import { BaseView } from '../../../layout-related/views/base-view'
import { useNumberedList } from '@Pimcore/components/form/numbered-list/provider/numbered-list/use-numbered-list'
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
  const isItemLimitReached = maxItemsCount > 0 && valuesKeys.length === maxItemsCount
  const isHideAddButton = isNoteditable || isItemLimitReached || valuesKeys.length > 0

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
                disallowAdd={ props.disallowAddRemove === true || isItemLimitReached }
                disallowDelete={ props.disallowAddRemove === true }
                disallowReorder={ props.disallowReorder }
                docked={ props.border === true }
                field={ index }
                noteditable={ props.noteditable }
              />
            </div>
          ))}
        </Space>
      </Box>
    </BaseView>
  ), [values])
}
