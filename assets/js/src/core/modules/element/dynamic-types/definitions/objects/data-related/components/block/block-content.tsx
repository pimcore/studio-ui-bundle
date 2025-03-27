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
import { type BlockProps } from './block'
import { useNumberedList } from '@Pimcore/components/form/numbered-list/provider/numbered-list/use-numbered-list'
import { BlockAddButton } from './block-add-button'
import { BlockItem } from './block-item'

export interface BlockContentProps extends BlockProps {}

/* eslint-disable react/no-children-prop */
export const BlockContent = (props: BlockContentProps): React.JSX.Element => {
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
      extra={ !isHideAddButton && <BlockAddButton /> }
      extraPosition='start'
      theme='default'
      title={ props.title }
    >
      {values.map((value, index) => (
        <div key={ index }>
          <BlockItem
            children={ props.children }
            field={ index }
            noteditable={ props.noteditable }
          />
        </div>
      ))}
    </BaseView>
  ), [values])
}
