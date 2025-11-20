/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useMemo, useState } from 'react'
import { type IDynamicFilter } from '../dynamic-filter/provider/dynamic-filter-provider'
import { StackList, type StackListProps } from '../stack-list/stack-list'
import { DynamicFilter } from '../dynamic-filter/dynamic-filter'
import { IconButton } from '../icon-button/icon-button'
import { Tag } from '../tag/tag'
import { Flex } from '../flex/flex'
import { Tooltip } from '../tooltip/tooltip'
import { PermissionBasedLanguageSelectionControl } from '@Pimcore/modules/element/components/language-selection/permission-based-language-selection-control'

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
    let index = _data.findIndex((f) => f.id === filter.id)

    if (filter.type === 'dataobject.classificationstore') {
      index = _data.findIndex((f) => f.id === filter.id && f.config?.keyId === filter.config?.keyId && f.config?.groupId === filter.config?.groupId)
    }

    const updatedData = [..._data]
    updatedData[index] = { ...updatedData[index], data }
    setData(updatedData)
  }

  const onLanguageSelectionChanged = (filter: IDynamicFilter, locale: string | null): void => {
    let index = _data.findIndex((f) => f.id === filter.id)

    if (filter.type === 'dataobject.classificationstore') {
      index = _data.findIndex((f) => f.id === filter.id && f.config?.keyId === filter.config?.keyId && f.config?.groupId === filter.config?.groupId)
    }

    const updatedData = [..._data]
    updatedData[index] = { ...updatedData[index], locale }
    setData(updatedData)
  }

  const onRemoveClick = (filter: IDynamicFilter): void => {
    if (filter.type === 'dataobject.classificationstore') {
      setData(_data.filter((f) => !(f.id === filter.id && f.config?.keyId === filter.config?.keyId && f.config?.groupId === filter.config?.groupId)))
      return
    }

    setData(_data.filter((f) => f.id !== filter.id))
  }

  const items: StackListProps['items'] = _data.map((filter) => {
    let key = filter.id

    if (filter.type === 'dataobject.classificationstore') {
      key = `${filter.id}-${JSON.stringify({ keyId: filter.config.keyId, groupId: filter.config?.groupId })}`
    }

    return {
      id: filter.id,
      key,
      title: filter.id,
      children: <Tooltip title={ filter.nameTooltip }>
        <Tag>{filter.translationKey}</Tag>
      </Tooltip>,
      body: (
        <DynamicFilter
          { ...filter }
          onChange={ (data) => { onFilterChange(filter, data) } }
        />
      ),
      renderRightToolbar: (
        <Flex gap="mini">
          {filter.localizable === true && (
            <PermissionBasedLanguageSelectionControl
              isNullable
              key={ 'language' }
              onChange={ (locale) => { onLanguageSelectionChanged(filter, locale) } }
              value={ filter.locale === undefined ? null : filter.locale }
            />
          )}
          <IconButton
            icon={ { value: 'close' } }
            key={ 'remove' }
            onClick={ () => { onRemoveClick(filter) } }
          />
        </Flex>
      )
    }
  })

  return useMemo(() => (
    <StackList items={ items } />
  ), [items])
}
