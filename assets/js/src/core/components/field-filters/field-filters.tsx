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

import React, { useEffect, useMemo, useState } from 'react'
import { type IDynamicFilter } from '../dynamic-filter/provider/dynamic-filter-provider'
import { StackList, type StackListProps } from '../stack-list/stack-list'
import { DynamicFilter } from '../dynamic-filter/dynamic-filter'
import { ButtonGroup } from '../button-group/button-group'
import { IconButton } from '../icon-button/icon-button'
import { Tag } from '../tag/tag'

export interface FieldFiltersProps {
  data: IDynamicFilter[]
  onChange?: (data: IDynamicFilter[]) => void
}

export const FieldFilters = ({ data, onChange }: FieldFiltersProps): React.JSX.Element => {
  const [_data, _setData] = useState(data)

  const setData = (data: IDynamicFilter[]): void => {
    _setData(data)

    if (onChange !== undefined) {
      onChange(data)
    }
  }

  useEffect(() => {
    _setData(data)
  }, [data])

  const onFilterChange = (filter: IDynamicFilter, data: any): void => {
    const index = _data.findIndex((f) => f.id === filter.id)
    const updatedData = [..._data]
    updatedData[index] = { ...updatedData[index], data }
    setData(updatedData)
  }

  const onRemoveClick = (filter: IDynamicFilter): void => {
    setData(_data.filter((f) => f.id !== filter.id))
  }

  const items: StackListProps['items'] = _data.map((filter) => {
    return {
      id: filter.id,

      key: filter.id,
      title: filter.id,
      children: <Tag>{filter.id}</Tag>,
      body: (
        <DynamicFilter
          { ...filter }
          onChange={ (data) => { onFilterChange(filter, data) } }
        />
      ),
      renderRightToolbar: (
        <ButtonGroup items={
          [
            <IconButton
              icon={ { value: 'close' } }
              key={ 'remove' }
              onClick={ () => { onRemoveClick(filter) } }
            />
          ] }
        />
      )
    }
  })

  return useMemo(() => (
    <StackList items={ items } />
  ), [items])
}
