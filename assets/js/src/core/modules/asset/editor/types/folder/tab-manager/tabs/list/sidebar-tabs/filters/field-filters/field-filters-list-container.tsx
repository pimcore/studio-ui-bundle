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

import React from 'react'
import { type GridColumnConfiguration } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { StackList, type StackListProps } from '@Pimcore/components/stack-list/stack-list'
import { Empty, Tag } from 'antd'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { DefaultFilter } from './filter-types/default-filter'
import { useFilters } from '../hooks/use-filters'

interface FieldFiltersListContainerProps {
  columns: GridColumnConfiguration[]
}

export const FieldFiltersListContainer = ({ columns }: FieldFiltersListContainerProps): React.JSX.Element => {
  const { removeFieldFilter, removeColumn } = useFilters()

  const items: StackListProps['items'] = columns.map((column) => ({
    id: column.key,
    children: <Tag>{column.key}</Tag>,
    renderRightToolbar: <ButtonGroup items={
        [
          <IconButton
            icon='close'
            key={ 'remove' }
            onClick={ () => { onRemoveColumnClick(column) } }
          />
        ]
      }
                        />,
    body: <DefaultFilter column={ column } />
  }))

  return (
    <>
      {items.length === 0 && <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE } />}
      {items.length > 0 && <StackList items={ items } />}
    </>
  )

  function onRemoveColumnClick (column: GridColumnConfiguration): void {
    removeColumn(column)
    removeFieldFilter(column)
  }
}
