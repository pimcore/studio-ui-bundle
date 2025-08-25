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
import { BaseView } from '@Pimcore/components/base-view/base-view'
import { type BlockProps } from './block'
import { useNumberedList } from '@Pimcore/components/form/controls/numbered-list/provider/numbered-list/use-numbered-list'
import { BlockAddButton } from './block-add-button'
import { BlockItem } from './block-item'
import { Space } from '@Pimcore/components/space/space'
import { Box } from '@Pimcore/components/box/box'
import { Form } from '@Pimcore/components/form/form'

export interface BlockContentProps extends BlockProps {}

export const BlockContent = (props: BlockContentProps): React.JSX.Element => {
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
      extra={ !isHideAddButton && <BlockAddButton /> }
      extraPosition='start'
      theme='default'
      title={ props.title }
    >
      <Box padding={ { top: 'extra-small' } }>
        {values.map((_value, index) => (
          <div key={`block-item-${index}`} style={{ marginBottom: '8px' }}>
            <BlockItem
              field={index}
              disallowAdd={ isDisallowAddRemove || isItemLimitReached || isNoteditable }
              disallowDelete={ isDisallowAddRemove || isNoteditable }
              disallowReorder={ props.disallowReorder === true || isNoteditable }
            >
              <Form.Group name={index}>
                {props.children}
              </Form.Group>
            </BlockItem>
          </div>
        ))}
      </Box>
    </BaseView>
  ), [values, props, isNoteditable, isDisallowAddRemove, isItemLimitReached, isHideAddButton])
}
